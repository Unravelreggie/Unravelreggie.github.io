import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const root = process.cwd();
const expected = "https://github.com/Unravelreggie/Unravelreggie.github.io.git";
function git(args, cwd = root, capture = false) {
  const result = spawnSync("git", ["-c", "credential.helper=", "-c", "credential.helper=!gh auth git-credential", ...args], {
    cwd, encoding: "utf8", stdio: capture ? "pipe" : "inherit",
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
  });
  if (result.status !== 0) throw new Error("Git command failed: " + args[0]);
  return capture ? result.stdout.trim() : "";
}
if (git(["remote", "get-url", "origin"], root, true) !== expected) throw new Error("Unexpected repository remote.");
if (git(["status", "--porcelain"], root, true)) throw new Error("Commit the intended source before publishing.");
const sourceCommit = git(["rev-parse", "HEAD"], root, true);
mkdirSync(join(root, "work"), { recursive: true });
const stage = mkdtempSync(join(root, "work", "github-pages-"));
git(["init"], stage);
git(["remote", "add", "origin", expected], stage);
git(["config", "user.name", git(["config", "user.name"], root, true)], stage);
git(["config", "user.email", git(["config", "user.email"], root, true)], stage);
const existing = git(["ls-remote", "origin", "refs/heads/gh-pages"], stage, true);
if (existing) {
  git(["fetch", "--depth=1", "origin", "gh-pages"], stage);
  git(["checkout", "-b", "gh-pages", "FETCH_HEAD"], stage);
  git(["rm", "-r", "--ignore-unmatch", "."], stage);
} else {
  git(["checkout", "--orphan", "gh-pages"], stage);
}
cpSync(resolve(root, "dist/client"), stage, { recursive: true });
writeFileSync(join(stage, ".nojekyll"), "");
writeFileSync(join(stage, "build-info.json"), JSON.stringify({ sourceCommit, builtAt: new Date().toISOString() }, null, 2) + "\n");
git(["add", "."], stage);
git(["commit", "-m", "Publish portfolio from " + sourceCommit.slice(0, 12)], stage);
git(["push", "origin", "gh-pages"], stage);
console.log("Published artifact commit: " + git(["rev-parse", "HEAD"], stage, true));
console.log("Source commit: " + sourceCommit);
