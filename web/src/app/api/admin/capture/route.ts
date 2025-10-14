import { NextRequest, NextResponse } from 'next/server';
import { assemblePrompt } from '@/lib/prompt/assemblePrompt';
import { presets } from '@/content/presets';
import { callProvider } from '@/lib/provider/callProvider';

export async function POST(req: NextRequest) {
  // Optional simple guard for manual/local use
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: 'Admin capture disabled. Set ADMIN_TOKEN to enable.' }, { status: 403 });
  }
  const header = req.headers.get('x-admin-token');
  if (header !== adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as {
    items?: Array<{ presetId: string; colorHex: string; length?: 'bob' | 'shoulder' | 'waist' }>;
  };

  const defaults: Array<{ presetId: string; colorHex: string; length?: 'bob' | 'shoulder' | 'waist' }> = [
    { presetId: 'knotless-braids-classic', colorHex: '#0D0D0D', length: 'waist' },
    { presetId: 'silk-press-straight', colorHex: '#D6A774', length: 'shoulder' },
    { presetId: 'finger-waves', colorHex: '#3B2F2F' },
    { presetId: 'boho-knotless-curly-ends', colorHex: '#F1CF7A', length: 'waist' },
    { presetId: 'two-strand-twists', colorHex: '#B55239', length: 'shoulder' },
    { presetId: 'afro-halo-puff', colorHex: '#0A0F2C' }
  ];

  const items = Array.isArray(body.items) && body.items.length ? body.items : defaults;

  const controller = new AbortController();
  const results: Array<{
    presetId: string;
    colorHex: string;
    length?: string;
    imageUrl?: string;
    promptUsed?: string;
    error?: string;
  }> = [];

  for (const item of items) {
    try {
      const preset = presets.find((p) => p.id === item.presetId);
      const prompt = assemblePrompt({ presetId: item.presetId, colorHex: item.colorHex, length: item.length });
      const { imageUrl } = await callProvider({ prompt, signal: controller.signal, ...(preset?.overrides ?? {}) } as any);
      results.push({ ...item, imageUrl, promptUsed: prompt });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      results.push({ ...item, error: message });
    }
  }

  return NextResponse.json({ count: results.length, results });
}

export const runtime = 'nodejs';

