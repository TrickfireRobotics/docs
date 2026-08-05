import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import { detectRepoName } from "./init.js";

const execFileAsync = promisify(execFile);

async function makeTempRepo(): Promise<string> {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "trickfire-docs-init-test-"));
    await execFileAsync("git", ["init", "-q"], { cwd: dir });
    return dir;
}

describe("detectRepoName", () => {
    const dirs: string[] = [];

    afterEach(async () => {
        await Promise.all(
            dirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true }))
        );
    });

    it("reads the repo name from an SSH origin remote", async () => {
        const dir = await makeTempRepo();
        dirs.push(dir);
        await execFileAsync(
            "git",
            ["remote", "add", "origin", "git@github.com:Org/rover-firmware.git"],
            {
                cwd: dir,
            }
        );

        await expect(detectRepoName(dir)).resolves.toBe("rover-firmware");
    });

    it("reads the repo name from an HTTPS origin remote", async () => {
        const dir = await makeTempRepo();
        dirs.push(dir);
        await execFileAsync(
            "git",
            ["remote", "add", "origin", "https://github.com/Org/rover-firmware.git"],
            {
                cwd: dir,
            }
        );

        await expect(detectRepoName(dir)).resolves.toBe("rover-firmware");
    });

    it("returns undefined when there's no origin remote", async () => {
        const dir = await makeTempRepo();
        dirs.push(dir);

        await expect(detectRepoName(dir)).resolves.toBeUndefined();
    });

    it("returns undefined when the directory isn't a git repo", async () => {
        const dir = await fs.mkdtemp(path.join(os.tmpdir(), "trickfire-docs-init-test-"));
        dirs.push(dir);

        await expect(detectRepoName(dir)).resolves.toBeUndefined();
    });
});
