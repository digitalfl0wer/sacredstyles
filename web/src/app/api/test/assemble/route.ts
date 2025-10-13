import { NextResponse } from 'next/server';
import { assemblePrompt } from '@/lib/prompt/assemblePrompt';
import { presets } from '@/content/presets';
import { negativePrompt } from '@/lib/prompt/negativePrompt';

export async function GET() {
  const results: Array<{ name: string; ok: boolean; details?: string }> = [];

  function add(name: string, fn: () => void) {
    try {
      fn();
      results.push({ name, ok: true });
    } catch (e) {
      results.push({ name, ok: false, details: e instanceof Error ? e.message : String(e) });
    }
  }

  const color = '#D6A774';

  add('includes trigger, color, and length for length-enabled preset', () => {
    const preset = presets.find((p) => p.id === 'knotless-braids-classic');
    if (!preset) throw new Error('missing preset');
    const out = assemblePrompt({ presetId: preset.id, colorHex: color, length: 'waist' });
    if (!out.includes(preset.trigger)) throw new Error('missing trigger');
    if (!out.includes(color)) throw new Error('missing color');
    if (!out.includes('waist')) throw new Error('missing length');
    if (!out.includes(negativePrompt)) throw new Error('missing negative prompt');
  });

  add('omits length token for length-disabled preset', () => {
    const preset = presets.find((p) => p.id === 'finger-waves');
    if (!preset) throw new Error('missing preset');
    const out = assemblePrompt({ presetId: preset.id, colorHex: color, length: 'waist' });
    if (out.includes('waist')) throw new Error('length should be omitted');
  });

  add('no double commas or extra spaces', () => {
    const preset = presets.find((p) => p.id === 'knotless-braids-classic');
    if (!preset) throw new Error('missing preset');
    const out = assemblePrompt({ presetId: preset.id, colorHex: color, length: 'bob' });
    if (out.includes(', ,') || /\s{2,}/.test(out)) throw new Error('formatting artifacts present');
  });

  const ok = results.every((r) => r.ok);
  return NextResponse.json({ ok, results });
}

export const runtime = 'nodejs';

