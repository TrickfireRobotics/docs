import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ProcessError, log, wasInterrupted } from "./logger.js";

// vitest runs under a non-TTY stdout with no FORCE_COLOR, so logger.ts's
// module-scope `colorEnabled`/`isTTY` are both false here - exercising the
// plain (non-spinner, non-ANSI) code path deterministically.

describe("log", () => {
    let logSpy: ReturnType<typeof vi.spyOn>;
    let warnSpy: ReturnType<typeof vi.spyOn>;
    let errorSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
        errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("prefixes success/info/warn/error with the right stream and icon", () => {
        log.success("created foo");
        log.info("starting up");
        log.warn("careful");
        log.error("boom");

        expect(logSpy).toHaveBeenCalledWith("✓ created foo");
        expect(logSpy).toHaveBeenCalledWith("i starting up");
        expect(warnSpy).toHaveBeenCalledWith("⚠ careful");
        expect(errorSpy).toHaveBeenCalledWith("✗ boom");
    });

    it("step() resolves with the callback's value and reports success", async () => {
        const result = await log.step("doing thing", async () => 42);

        expect(result).toBe(42);
        expect(logSpy).toHaveBeenCalledWith("… doing thing");
        expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/^✓ doing thing \(\d+m?s\)$/));
    });

    it("step() rethrows on failure, marks it reported, and prints captured output", async () => {
        const err = new ProcessError("git exited with code 1", "line one\n\nline two\n");

        await expect(
            log.step("syncing", async () => {
                throw err;
            })
        ).rejects.toBe(err);

        expect((err as Error & { reported?: boolean }).reported).toBe(true);
        expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/^✗ syncing \(\d+m?s\)$/));
        expect(errorSpy).toHaveBeenCalledWith("  line one");
        expect(errorSpy).toHaveBeenCalledWith("  line two");
        expect(errorSpy).toHaveBeenCalledWith("  git exited with code 1");
    });

    it("step() with a plain Error skips the output tail", async () => {
        const err = new Error("plain failure");

        await expect(
            log.step("doing thing", async () => {
                throw err;
            })
        ).rejects.toBe(err);

        expect(errorSpy).toHaveBeenCalledWith("  plain failure");
        expect(errorSpy).not.toHaveBeenCalledWith(expect.stringMatching(/^ {2}line/));
    });

    // Flips module-level interrupted state permanently, so this must run
    // last - a SIGINT can't be "un-received" mid-process.
    it("step() reports 'interrupted' instead of an error once SIGINT is received", async () => {
        expect(wasInterrupted()).toBe(false);
        process.emit("SIGINT", "SIGINT");
        expect(wasInterrupted()).toBe(true);

        const err = new Error("next dev exited with code 130");

        await expect(
            log.step("running dev server", async () => {
                throw err;
            })
        ).rejects.toBe(err);

        expect((err as Error & { reported?: boolean }).reported).toBe(true);
        expect(logSpy).toHaveBeenCalledWith("⚠ running dev server interrupted");
        expect(errorSpy).not.toHaveBeenCalled();
    });
});
