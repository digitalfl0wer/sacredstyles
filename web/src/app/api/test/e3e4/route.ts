import { NextResponse } from 'next/server';
import { assemblePrompt } from '@/lib/prompt/assemblePrompt';
import { presets, Preset } from '@/content/presets';
import { colors, lengths } from '@/content/options';
import { callProvider } from '@/lib/provider/callProvider';

type CheckResult = {
  name: string;
  ok: boolean;
  details?: string;
};

function pickLengthForPreset(preset: Preset): 'bob' | 'shoulder' | 'waist' | undefined {
  return preset.appliesLength ? 'shoulder' : undefined;
}

export async function GET() {
  if (process.env.ALLOW_TEST_ENDPOINTS !== 'true') {
    return NextResponse.json({ ok: false, error: 'Test endpoint disabled. Set ALLOW_TEST_ENDPOINTS=true to enable.' }, { status: 403 });
  }
  const results: CheckResult[] = [];
  const provider = process.env.NEXT_PUBLIC_GEN_PROVIDER ?? 'mock';

  async function e3_presetsGenerate() {
    const controller = new AbortController();
    const failures: Array<{ presetId: string; error: string }> = [];
    for (const preset of presets) {
      try {
        const colorHex = colors[0].hex; // stable default
        const length = pickLengthForPreset(preset);
        const prompt = assemblePrompt({ presetId: preset.id, colorHex, length });
        await callProvider({ prompt, signal: controller.signal, ...(preset.overrides ?? {}) } as any);
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        failures.push({ presetId: preset.id, error: message });
      }
    }
    const ok = failures.length === 0;
    results.push({ name: 'E3 Presets generate', ok, details: ok ? undefined : JSON.stringify(failures) });
    return { ok, failures };
  }

  function e4_optionsAffectOutput() {
    const samplePresets: Preset[] = [];
    // pick 3 that require length and 2 that do not
    samplePresets.push(...presets.filter((p) => p.appliesLength).slice(0, 3));
    samplePresets.push(...presets.filter((p) => !p.appliesLength).slice(0, 2));

    const colorA = colors[0].hex;
    const colorB = colors[4]?.hex ?? colors[1].hex;
    const lengthA: 'bob' | 'shoulder' | 'waist' = 'bob';
    const lengthB: 'bob' | 'shoulder' | 'waist' = 'waist';

    const issues: Array<{ presetId: string; reason: string }> = [];

    for (const preset of samplePresets) {
      // color variation should change the assembled prompt
      const pColorA = assemblePrompt({ presetId: preset.id, colorHex: colorA, length: pickLengthForPreset(preset) });
      const pColorB = assemblePrompt({ presetId: preset.id, colorHex: colorB, length: pickLengthForPreset(preset) });
      if (pColorA === pColorB) {
        issues.push({ presetId: preset.id, reason: 'Color variation did not change prompt' });
      }

      if (preset.appliesLength) {
        // length variation should change the assembled prompt
        const pLenA = assemblePrompt({ presetId: preset.id, colorHex: colorA, length: lengthA });
        const pLenB = assemblePrompt({ presetId: preset.id, colorHex: colorA, length: lengthB });
        if (pLenA === pLenB) {
          issues.push({ presetId: preset.id, reason: 'Length variation did not change prompt' });
        }
      } else {
        // For presets without length, prompt should be identical regardless of a provided length
        const pNoLen = assemblePrompt({ presetId: preset.id, colorHex: colorA });
        const pLenA = assemblePrompt({ presetId: preset.id, colorHex: colorA, length: lengthA });
        const pLenB = assemblePrompt({ presetId: preset.id, colorHex: colorA, length: lengthB });
        if (!(pNoLen === pLenA && pLenA === pLenB)) {
          issues.push({ presetId: preset.id, reason: 'Length altered prompt for length-disabled preset' });
        }
      }
    }

    const ok = issues.length === 0;
    results.push({ name: 'E4 Options affect output (prompt-level)', ok, details: ok ? undefined : JSON.stringify(issues) });
    return { ok, issues };
  }

  const e3 = await e3_presetsGenerate();
  const e4 = e4_optionsAffectOutput();

  const ok = e3.ok && e4.ok;
  return NextResponse.json({ ok, provider, e3, e4, results });
}

export const runtime = 'nodejs';

