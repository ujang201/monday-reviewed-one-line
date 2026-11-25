// SPDX-License-Identifier: MIT
// Monday, Reviewed in One Line — entry program.
// Writes one single-line review of the author's own Monday to
// /output/entry.txt. No input, no network, no randomness: the same
// fixed review is produced on every run, byte for byte.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The review is assembled from three beats so the joke lands in order:
// the meeting that ate the weekend, the inbox that gave up on me, and
// the one-star verdict. Keeping the beats separate makes the turn
// (setup -> escalation -> punchline) easy to read and to tune.
const beats: string[] = [
  "Monday: my 9 a.m. stand-up outlasted my entire weekend,",
  "my inbox filed for divorce,",
  "and the coffee machine just laughed at me. One star — would not Monday again.",
];

function composeReview(parts: readonly string[]): string {
  const line = parts.join(" ").replace(/\s+/g, " ").trim();
  if (line.length === 0 || line.length > 200) {
    throw new Error(`review must be 1-200 characters, got ${line.length}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("review must be a single line");
  }
  return line;
}

function main(): void {
  const review = composeReview(beats);
  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  // No trailing newline: the file holds exactly the one-line review.
  writeFileSync(outPath, review, "utf8");
}

main();
