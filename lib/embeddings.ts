import { pipeline } from '@huggingface/sentence-transformers';

const model = pipeline('feature-extraction', 'sentence-transformers/all-MiniLM-L6-v2');

export async function embedTexts(texts: string[]): Promise<number[][]> {
  try {
    const embeddings = await Promise.all(
      texts.map(async (text) => {
        const embedding = await model(text);
        return Array.from(embedding.data);
      })
    );
    return embeddings;
  } catch (error) {
    console.error('Error generating embeddings:', error);
    throw error;
  }
}

export function chunkText(text: string, maxChunkSize = 500): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentSize = 0;

  for (const word of words) {
    if (currentSize + word.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
      currentChunk = [];
      currentSize = 0;
    }
    currentChunk.push(word);
    currentSize += word.length + 1; // +1 for space
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }

  return chunks;
}