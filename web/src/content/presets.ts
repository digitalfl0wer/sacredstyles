export type Preset = {
  id: string;
  name: string;
  template: string;
  trigger: string;
  appliesLength: boolean;
  overrides?: {
    steps?: number;
    guidance?: number;
    aspect?: '1:1' | '3:4' | '4:3';
    megapixels?: '1' | '1.5';
    lora_scale?: number;
  };
};

export const presets: Preset[] = [
  {
    id: 'knotless-braids-classic',
    name: 'Knotless Braids — Classic',
    template:
      'portrait of {trigger}, woman, knotless braids, {length}, defined braid texture, tight clean part lines, neat edges, natural hairline, {color}, neutral studio lighting, plain background',
    trigger: '@brie',
    appliesLength: true
  },
  {
    id: 'finger-waves',
    name: 'Finger Waves',
    template:
      'portrait of {trigger}, woman, finger waves close to the head, glossy sculpted S-waves, precise lines, natural hairline, {color}',
    trigger: '@brie',
    appliesLength: false
  }
  // TODO: Add remaining presets per PRD
];

