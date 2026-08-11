import type { TokenChunk } from '../types';

/**
 * Splits raw text into realistic simulated token chunks.
 * In LLM tokenizers (like Byte-Pair Encoding / Tiktoken):
 * - English words are often single tokens or subwords.
 * - Chinese characters are 1 char = 1 to 2 tokens.
 * - Code punctuation and indentation form distinct tokens.
 */
export function tokenizeText(text: string): TokenChunk[] {
  const chunks: TokenChunk[] = [];
  let idCounter = 0;
  let colorIdx = 0;

  let index = 0;
  while (index < text.length) {
    const char = text[index];

    // Check if Chinese character (CJK Unified Ideographs range)
    if (/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/.test(char)) {
      // High chance single Chinese character is a token, occasionally 2 chars
      let len = 1;
      // 20% chance to combine 2 Chinese chars if next is also Chinese (like common words)
      if (
        index + 1 < text.length &&
        /[\u4e00-\u9fa5]/.test(text[index + 1]) &&
        Math.random() > 0.6
      ) {
        len = 2;
      }
      const tokenText = text.slice(index, index + len);
      chunks.push({
        id: idCounter++,
        text: tokenText,
        colorIdx: colorIdx++ % 6,
        type: 'chinese_char',
      });
      index += len;
    }
    // Check if whitespace / newlines
    else if (/\s/.test(char)) {
      let len = 1;
      while (index + len < text.length && /\s/.test(text[index + len])) {
        len++;
      }
      chunks.push({
        id: idCounter++,
        text: text.slice(index, index + len),
        colorIdx: colorIdx++ % 6,
        type: 'whitespace',
      });
      index += len;
    }
    // Check if word / English / numbers
    else if (/[a-zA-Z0-9_]/.test(char)) {
      let len = 1;
      while (index + len < text.length && /[a-zA-Z0-9_]/.test(text[index + len])) {
        len++;
      }
      const word = text.slice(index, index + len);
      
      // Split very long words or keep standard word as token
      if (word.length > 6) {
        // Subword splitting for longer words
        const part1 = word.slice(0, Math.floor(word.length / 2));
        const part2 = word.slice(Math.floor(word.length / 2));
        chunks.push({
          id: idCounter++,
          text: part1,
          colorIdx: colorIdx++ % 6,
          type: 'word',
        });
        chunks.push({
          id: idCounter++,
          text: part2,
          colorIdx: colorIdx++ % 6,
          type: 'word',
        });
      } else {
        chunks.push({
          id: idCounter++,
          text: word,
          colorIdx: colorIdx++ % 6,
          type: 'word',
        });
      }
      index += len;
    }
    // Punctuation & symbols
    else {
      chunks.push({
        id: idCounter++,
        text: char,
        colorIdx: colorIdx++ % 6,
        type: 'punct',
      });
      index += 1;
    }
  }

  return chunks;
}
