import { presets } from '@/content/presets';
import { negativePrompt } from '@/lib/prompt/negativePrompt';

type AssembleArgs = {
  presetId: string;
  colorHex: string;
  length?: 'bob' | 'shoulder' | 'waist';
};

export function assemblePrompt(args: AssembleArgs): string {
  const preset = presets.find((p) => p.id === args.presetId);
  if (!preset) throw new Error('Unknown preset');
  const lengthPart = preset.appliesLength && args.length ? args.length : '';
  let base = preset.template
    .replace('{trigger}', preset.trigger)
    .replace('{color}', args.colorHex)
    .replace('{length}', lengthPart);
  base = base.replace(/\s+,/g, ',').replace(/,\s*,/g, ', ').replace(/\s{2,}/g, ' ').trim();
  const full = `${base}, negative prompt: ${negativePrompt}`;
  return full;
}

