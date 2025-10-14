import { colors } from '@/content/options';
import { presets } from '@/content/presets';
import { negativePrompt } from '@/lib/prompt/negativePrompt';

type AssembleArgs = {
  presetId: string;
  colorHex: string;
  length?: 'bob' | 'shoulder' | 'waist';
  includeNegative?: boolean;
};

function describeColor(hex: string): string {
  const match = colors.find((c) => c.hex.toLowerCase() === hex.toLowerCase());
  if (!match) return hex;
  return `${match.name} hair color (${match.hex})`;
}

function shouldIncludeNegative(includeOverride: boolean | undefined): boolean {
  if (typeof includeOverride === 'boolean') return includeOverride;
  const flag = process.env.NEXT_PUBLIC_DISABLE_NEGATIVE_PROMPT;
  if (!flag) return true;
  return flag.toLowerCase() !== 'true';
}

export function assemblePrompt(args: AssembleArgs): string {
  const preset = presets.find((p) => p.id === args.presetId);
  if (!preset) throw new Error('Unknown preset');
  const lengthPart = preset.appliesLength && args.length ? args.length : '';
  let base = preset.template
    .replace('{trigger}', preset.trigger)
    .replace('{color}', describeColor(args.colorHex))
    .replace('{length}', lengthPart);
  base = `${base}, vertical portrait orientation, upper body framing, centered composition, eye-level camera`;
  base = base.replace(/\s+,/g, ',').replace(/,\s*,/g, ', ').replace(/\s{2,}/g, ' ').trim();
  const includeNegative = shouldIncludeNegative(args.includeNegative);
  const full = includeNegative ? `${base}, negative prompt: ${negativePrompt}` : base;
  return full;
}
