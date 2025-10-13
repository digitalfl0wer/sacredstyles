type ProviderArgs = {
  prompt: string;
  seed?: number;
  steps?: number;
  guidance?: number;
  aspect?: '1:1' | '3:4' | '4:3';
  megapixels?: '1' | '1.5';
  lora_scale?: number;
  signal?: AbortSignal;
};

export async function callProvider({
  prompt,
  seed,
  steps,
  guidance,
  aspect,
  megapixels,
  lora_scale,
  signal
}: ProviderArgs): Promise<{
  imageUrl: string;
  meta: { steps: number; guidance: number; aspect: string };
}> {
  const provider = process.env.NEXT_PUBLIC_GEN_PROVIDER ?? 'mock';
  console.log('[provider] selected:', provider);
  if (provider === 'mock') {
    await new Promise((r) => setTimeout(r, 600));
    const dataUrl =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAcElEQVR4nO3QsQkAIBAEQf7/0xTqk8JHqgq4g5nQ1r3rCwAAAAAAAAAA8M9z9zqkqgqZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZ2Vn7pWlqKqCqKqCqKqCqKqCqKqCqKqCqKqCqKqCqKqCqKqCqKqCqKqCqKqCqKqCy0Cz7w3k3w2gQAAAABJRU5ErkJggg==';
    return {
      imageUrl: dataUrl,
      meta: { steps: 32, guidance: 4.2, aspect: '3:4' }
    };
  }
  if (provider === 'replicate') {
    const { runReplicate } = await import('./replicate');
    return runReplicate({ prompt, seed, steps, guidance, aspect, megapixels, lora_scale, signal });
  }
  throw new Error(
    `Unsupported generation provider "${provider}". Set NEXT_PUBLIC_GEN_PROVIDER to "mock" or "replicate".`
  );
}
