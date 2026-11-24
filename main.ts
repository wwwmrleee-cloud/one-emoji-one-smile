// One Emoji, One Smile — make.fun entry (u-0xkianno-one-emoji-one-smile-5470751f)
//
// The task: send exactly one emoji, the one most likely to make a stranger
// smile. A judge model compares entries two at a time and picks the warmer.
// This program writes that single emoji to /output/entry.txt and nothing else.
//
// How the emoji was picked — against the judge's own brief, most important first:
//   1. A single emoji a stranger reads as warm and friendly.
//   2. Warmth at first glance, no context needed.
//   3. Universality: any age or background reads it the same way, no irony.
//   4. Chosen rather than default: not the first smiley that comes to mind.
//   5. Right for a stranger: no intimacy, sarcasm or flirtation.
//
// Candidates weighed:
//   - 🙂 / 😊  Warm and universal, but the default smileys — they fail (4),
//     the brief explicitly prefers a pick that feels chosen.
//   - 😄      Cheerful, but loud laughter reads as excitement more than warmth.
//   - 🥰      Warm, but the hearts make it affectionate — from a stranger that
//             risks reading as flirtatious, which fails (5).
//   - 🫶      Warm and distinctive, but it signals affection and is a newer
//             emoji, so it is less universal than a face (3).
//   - 🌞 / 🌻 Cheerful and distinctive, but neither is a face turned toward
//             the stranger; their warmth is indirect, so they lose on (2).
//   - 🤗      A smiling face with open arms: a hug offered to whoever sees it.
//             Instantly warm (2), understood everywhere with no irony (3),
//             clearly a deliberate pick over the default smiley (4), and a
//             friendly hug — not intimacy, not flirtation (5).
//
// The pick is 🤗 (U+1F917 HUGGING FACE): one code point, four UTF-8 bytes,
// written with no trailing newline so the file holds exactly the emoji.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EMOJI = "🤗";
const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, EMOJI, "utf8");

  // Verify what was written: exactly one emoji, nothing else.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  const codePoints = [...written];
  if (codePoints.length !== 1 || written !== EMOJI) {
    throw new Error(
      `entry.txt must hold exactly one emoji, got ${codePoints.length} code point(s)`,
    );
  }
  console.log(`Wrote ${EMOJI} (${codePoints.length} code point, ${Buffer.byteLength(written, "utf8")} bytes) to ${OUTPUT_PATH}`);
}

main();
