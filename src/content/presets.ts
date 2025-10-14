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
    trigger: '@briez',
    appliesLength: true
  },
  {
    id: 'finger-waves',
    name: 'Finger Waves',
    template:
      'portrait of {trigger}, woman, finger waves close to the head, glossy sculpted S-waves, precise lines, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: false
  },
  {
    id: 'knotless-bob-braids',
    name: 'Knotless Bob Braids',
    template:
      'portrait of {trigger}, woman, knotless bob braids, jawline length, crisp parting, neat edges, natural hairline, {color}, neutral studio lighting',
    trigger: '@briez',
    appliesLength: false
  },
  {
    id: 'boho-knotless-curly-ends',
    name: 'Boho Knotless (curly ends)',
    template:
      'portrait of {trigger}, woman, boho knotless braids with curly ends, {length}, soft romantic curls, clean parts, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: true
  },
  {
    id: 'soft-locs',
    name: 'Soft Locs',
    template:
      'portrait of {trigger}, woman, soft locs, {length}, uniform sections, neat edges, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: true
  },
  {
    id: 'goddess-locs',
    name: 'Goddess Locs',
    template:
      'portrait of {trigger}, woman, goddess locs with curly tendrils, {length}, defined loc texture, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: true
  },
  {
    id: 'faux-locs-bob',
    name: 'Faux Locs Bob',
    template:
      'portrait of {trigger}, woman, faux locs bob, chin length, clean edges, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: false
  },
  {
    id: 'cornrows-straight-back',
    name: 'Cornrows — Straight Back',
    template:
      'portrait of {trigger}, woman, cornrows straight back, even row width, clean scalp visibility, neat edges, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: false
  },
  {
    id: 'fulani-braids-feed-in',
    name: 'Fulani Braids (feed-in)',
    template:
      'portrait of {trigger}, woman, Fulani braids with feed-in cornrows and statement center braid, beads optional, clean parts, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: false
  },
  {
    id: 'lemonade-braids-side-swept',
    name: 'Lemonade Braids (side-swept)',
    template:
      'portrait of {trigger}, woman, side-swept lemonade braids, clean curving parts, neat edges, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: false
  },
  {
    id: 'ghana-braids-thick-feed-in',
    name: 'Ghana Braids (thick feed-in)',
    template:
      'portrait of {trigger}, woman, Ghana braids with thick feed-in rows, alternating sizes, precise parting, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: false
  },
  {
    id: 'two-strand-twists',
    name: 'Two-Strand Twists',
    template:
      'portrait of {trigger}, woman, defined two-strand twists, {length}, moisturized twist texture, neat edges, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: true
  },
  {
    id: 'twist-out',
    name: 'Twist-Out',
    template:
      'portrait of {trigger}, woman, twist-out with uniform coils, {length}, defined curl clumps, minimal frizz, {color}',
    trigger: '@briez',
    appliesLength: true
  },
  {
    id: 'silk-press-straight',
    name: 'Silk Press (straight)',
    template:
      'portrait of {trigger}, woman, silk press straight hair, {length}, sleek smooth finish, movement, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: true
  },
  {
    id: 'kinky-straight-blowout',
    name: 'Kinky Straight Blowout',
    template:
      'portrait of {trigger}, woman, kinky straight blowout, {length}, airy volume, textured straight fibers, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: true
  },
  {
    id: 'curly-bob-deep-curl',
    name: 'Curly Bob (deep curl)',
    template:
      'portrait of {trigger}, woman, deep curly bob, defined curl clumps, even density, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: false
  },
  {
    id: 'pixie-cut',
    name: 'Pixie Cut',
    template:
      'portrait of {trigger}, woman, pixie cut, tapered sides, soft crown texture, crisp edges, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: false
  },
  {
    id: 'twa-defined-coils',
    name: 'TWA (defined coils)',
    template:
      'portrait of {trigger}, woman, teeny-weeny afro with defined coils, even curl pattern, moisturized sheen, natural hairline, {color}',
    trigger: '@briez',
    appliesLength: false
  },
  {
    id: 'afro-halo-puff',
    name: 'Afro Halo Puff',
    template:
      'portrait of {trigger}, woman, afro puff halo, soft rounded shape, coil definition at edges, natural hairline, {color}, soft sheen',
    trigger: '@briez',
    appliesLength: false
  },
  {
    id: 'low-taper-fade-waves',
    name: 'Low Taper Fade + Waves',
    template:
      'portrait of {trigger}, woman, low taper fade with 360 waves, crisp lineup, clean edges, natural hairline, {color}, matte finish',
    trigger: '@briez',
    appliesLength: false
  }
];

