// Branded console output for the trickfire-docs CLI and site build step.
// Kept dependency-free - node:util's styleText (stable since Node 22) covers
// everything chalk/picocolors would, and this only ever runs under a Node
// version modern enough to have it.
import { styleText } from "node:util";
import readline from "node:readline";
import { createInterface } from "node:readline/promises";

type Style = Parameters<typeof styleText>[0];

const isTTY = process.stdout.isTTY === true;
const colorEnabled = !("NO_COLOR" in process.env) && (isTTY || !!process.env.FORCE_COLOR);

function paint(style: Style, text: string): string {
    return colorEnabled ? styleText(style, text) : text;
}

// Echoes the site's own brand palette (--tf-green / --tf-pink in
// src/app/global.css) using their nearest ANSI equivalents.
const ICONS = {
    info: () => paint("cyan", "i"),
    success: () => paint("green", "✓"),
    warn: () => paint("yellow", "⚠"),
    error: () => paint("magenta", "✗"),
    prompt: () => paint("cyan", "?"),
};

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

// Node's default SIGINT/SIGTERM behavior is to kill the process immediately
// with exit code 130/143 - which, with stdio inherited from a long-lived
// child like `next dev`, races ahead of that child's own graceful shutdown
// and skips straight past any of our own error reporting. Registering a
// handler (even a no-op one) disables that default kill, so an
// await-ed run() gets to settle normally and callers can tell "user hit
// Ctrl-C" apart from an actual failure via wasInterrupted().
let interrupted = false;
process.on("SIGINT", () => {
    interrupted = true;
});
process.on("SIGTERM", () => {
    interrupted = true;
});

export function wasInterrupted(): boolean {
    return interrupted;
}

/** Thrown by repo-cache.ts's run() when a piped subprocess exits non-zero -
 * carries its captured stdout/stderr so log.step() can print just the
 * useful tail instead of leaving raw subprocess noise on screen. */
export class ProcessError extends Error {
    readonly output: string;

    constructor(message: string, output: string) {
        super(message);
        this.name = "ProcessError";
        this.output = output;
    }
}

function formatElapsed(ms: number): string {
    return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`;
}

function tail(text: string, maxLines: number): string[] {
    const lines = text.split("\n").filter((l) => l.trim().length > 0);
    return lines.slice(-maxLines);
}

function clearLine(): void {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
}

export const log = {
    /** Section banner, e.g. at the start of a `dev`/`build`/`init` run. */
    heading(text: string): void {
        console.log("\n" + paint(["green", "bold"], `◆ ${text}`));
    },

    /** Blank separator line - kept as a named helper rather than a bare
     * console.log() so spacing intent stays visible at call sites. */
    blank(): void {
        console.log();
    },

    info(text: string): void {
        console.log(`${ICONS.info()} ${text}`);
    },

    success(text: string): void {
        console.log(`${ICONS.success()} ${text}`);
    },

    warn(text: string): void {
        console.warn(`${ICONS.warn()} ${paint("yellow", text)}`);
    },

    error(text: string): void {
        console.error(`${ICONS.error()} ${paint("magenta", text)}`);
    },

    /**
     * Asks `question` with a styled "?" prefix and dimmed default shown
     * inline, e.g. `? Project name (docs): `. Skips prompting (returning
     * `defaultValue` as-is) when stdin isn't a TTY, e.g.
     * scripts/test-cli.sh's unattended `init` run, so callers never hang
     * waiting for input that isn't coming.
     */
    async prompt(question: string, defaultValue: string): Promise<string> {
        if (!process.stdin.isTTY) return defaultValue;
        const rl = createInterface({ input: process.stdin, output: process.stdout });
        try {
            const suffix = defaultValue ? ` ${paint("dim", `(${defaultValue})`)}` : "";
            const answer = await rl.question(
                `${ICONS.prompt()} ${paint("bold", question)}${suffix}: `
            );
            return answer.trim() || defaultValue;
        } finally {
            rl.close();
        }
    },

    /**
     * Runs `fn` behind a single status line: an animated spinner on a TTY
     * (a plain "started" line otherwise, e.g. in CI logs), collapsing to a
     * ✓/✗ line with elapsed time when it settles. On failure, prints the
     * tail of any captured subprocess output plus the error message, then
     * marks the error `reported` and rethrows so callers keep their normal
     * control flow without printing it a second time.
     */
    async step<T>(label: string, fn: () => Promise<T>): Promise<T> {
        const start = performance.now();

        if (isTTY) {
            let frame = 0;
            process.stdout.write(`${paint("cyan", SPINNER_FRAMES[0])} ${label}`);
            const timer = setInterval(() => {
                frame = (frame + 1) % SPINNER_FRAMES.length;
                clearLine();
                process.stdout.write(`${paint("cyan", SPINNER_FRAMES[frame])} ${label}`);
            }, 80);

            try {
                const result = await fn();
                clearInterval(timer);
                clearLine();
                console.log(
                    `${ICONS.success()} ${label} ${paint("dim", `(${formatElapsed(performance.now() - start)})`)}`
                );
                return result;
            } catch (err) {
                clearInterval(timer);
                clearLine();
                if (interrupted) {
                    console.log(`${ICONS.warn()} ${label} ${paint("dim", "interrupted")}`);
                    throw markReported(err);
                }
                console.log(
                    `${ICONS.error()} ${label} ${paint("dim", `(${formatElapsed(performance.now() - start)})`)}`
                );
                throw reportStepError(err);
            }
        }

        console.log(`… ${label}`);
        try {
            const result = await fn();
            console.log(
                `${ICONS.success()} ${label} (${formatElapsed(performance.now() - start)})`
            );
            return result;
        } catch (err) {
            if (interrupted) {
                console.log(`${ICONS.warn()} ${label} interrupted`);
                throw markReported(err);
            }
            console.log(`${ICONS.error()} ${label} (${formatElapsed(performance.now() - start)})`);
            throw reportStepError(err);
        }
    },
};

function markReported(err: unknown): unknown {
    if (err instanceof Error) (err as Error & { reported?: boolean }).reported = true;
    return err;
}

function reportStepError(err: unknown): unknown {
    if (err instanceof ProcessError && err.output.trim()) {
        for (const l of tail(err.output, 20)) console.error(paint("dim", `  ${l}`));
    }
    const message = err instanceof Error ? err.message : String(err);
    console.error(paint(["magenta", "bold"], `  ${message}`));
    return markReported(err);
}
