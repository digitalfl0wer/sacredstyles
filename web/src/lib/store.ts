export type OutputState = {
  imageUrl: string | null;
  prompt: string | null;
  meta: {
    presetId: string | null;
    presetName: string | null;
    colorHex: string | null;
    length: 'bob' | 'shoulder' | 'waist' | null;
  };
};

type Listener = (state: OutputState) => void;

const state: OutputState = {
  imageUrl: null,
  prompt: null,
  meta: { presetId: null, presetName: null, colorHex: null, length: null }
};
const listeners = new Set<Listener>();

export function subscribe(listener: Listener) {
  listeners.add(listener);
  listener(state);
  return () => listeners.delete(listener);
}

export function setOutput(next: Partial<OutputState>) {
  if (typeof next.imageUrl !== 'undefined') state.imageUrl = next.imageUrl;
  if (typeof next.prompt !== 'undefined') state.prompt = next.prompt;
  if (typeof next.meta !== 'undefined') state.meta = { ...state.meta, ...next.meta } as any;
  listeners.forEach((l) => l(state));
}

