import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { assemblePrompt } from '@/lib/prompt/assemblePrompt';
import { callProvider } from '@/lib/provider/callProvider';
import { presets } from '@/content/presets';

const BodySchema = z.object({
  presetId: z.string(),
  colorHex: z.string().regex(/^#([0-9a-fA-F]{6})$/),
  length: z.enum(['bob', 'shoulder', 'waist']).optional()
});

export async function POST(req: NextRequest) {
  const start = Date.now();
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);
  try {
    const { presetId, colorHex, length } = parsed.data;
    const preset = presets.find((p) => p.id === presetId);
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({ error: 'Generation disabled during build' }, { status: 503 });
    }
    const prompt = assemblePrompt({ presetId, colorHex, length });

    async function attempt() {
      return await callProvider({
        prompt,
        signal: controller.signal,
        aspect: '3:4',
        ...(preset?.overrides ?? {})
      } as any);
    }

    let result;
    try {
      result = await attempt();
    } catch (err) {
      // small backoff then one retry
      await new Promise((r) => setTimeout(r, 300));
      result = await attempt();
    }

    const { imageUrl, meta } = result;
    const durationMs = Date.now() - start;
    console.log('[generate] ok', { durationMs });
    return NextResponse.json({ imageUrl, promptUsed: prompt, meta, durationMs });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    const durationMs = Date.now() - start;
    console.error('Generation failed:', message, { durationMs });
    const body =
      process.env.NODE_ENV !== 'production'
        ? { error: 'Generation failed', details: message }
        : { error: 'Generation failed' };
    const status =
      message.includes('Missing Replicate env vars') || message.includes('Unsupported generation provider')
        ? 400
        : 500;
    return new Response(JSON.stringify(body), { status });
  } finally {
    clearTimeout(timeout);
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
