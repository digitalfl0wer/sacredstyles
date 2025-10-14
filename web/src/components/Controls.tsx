"use client";
import { useEffect, useState } from 'react';
import { presets } from '@/content/presets';
import { colors, lengths } from '@/content/options';
import { setOutput, subscribe } from '@/lib/store';

export function Controls() {
  const [presetId, setPresetId] = useState(presets[0]?.id ?? '');
  const [colorHex, setColorHex] = useState(colors[0]?.hex ?? '#0D0D0D');
  const [length, setLength] = useState<'bob' | 'shoulder' | 'waist'>('shoulder');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const preset = presets.find((p) => p.id === presetId);
  const showLength = Boolean(preset?.appliesLength);

  async function onGenerate() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetId, colorHex, length })
      });
      if (res.ok) {
        const data = (await res.json()) as { imageUrl: string; promptUsed: string };
        setOutput({
          imageUrl: data.imageUrl,
          prompt: data.promptUsed,
          meta: { presetId, presetName: preset?.name ?? null, colorHex, length }
        });
      } else {
        const body = (await res.json().catch(() => ({}))) as any;
        setError(body?.error ?? 'Something went off. Try Generate again.');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} aria-busy={busy}>
      <label>
        Style
        <select value={presetId} onChange={(e) => setPresetId(e.target.value)} disabled={busy}>
          {presets.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <fieldset style={{ marginTop: 12 }}>
        <legend>Color</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {colors.map((c) => (
            <label key={c.hex} className="swatch-label">
              <input
                className="swatch-input"
                type="radio"
                name="color"
                value={c.hex}
                checked={colorHex === c.hex}
                onChange={() => setColorHex(c.hex)}
                disabled={busy}
                style={{ appearance: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />
              <span aria-hidden className="swatch-dot" style={{ background: c.hex }} />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>

      {showLength && (
        <fieldset style={{ marginTop: 12 }}>
          <legend>Length</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {lengths.map((l) => (
              <div key={l.id}>
                <input
                  className="length-input"
                  id={`length-${l.id}`}
                  type="radio"
                  name="length"
                  value={l.id}
                  checked={length === l.id}
                  onChange={() => setLength(l.id as any)}
                  disabled={busy}
                  style={{ appearance: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                />
                <label htmlFor={`length-${l.id}`} className="length-label">{l.label}</label>
              </div>
            ))}
          </div>
        </fieldset>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button className="primary-button" type="button" onClick={onGenerate} disabled={busy}>
          {busy ? 'Generating…' : 'Generate'}
        </button>
        <details>
          <summary>Show prompt</summary>
          <PromptPreview />
        </details>
      </div>
      {error && (
        <div role="status" aria-live="polite" style={{ color: '#7b2d2d', marginTop: 8 }}>
          {error}
        </div>
      )}
    </form>
  );
}

function PromptPreview() {
  const [prompt, setPrompt] = useState<string | null>(null);
  useEffect(() => {
    const unsub = subscribeOutput((s) => setPrompt(s.prompt));
    return unsub;
  }, []);
  return <p style={{ maxWidth: 320, whiteSpace: 'pre-wrap' }}>{prompt ?? 'Prompt will appear here.'}</p>;
}

function subscribeOutput(cb: (s: { prompt: string | null }) => void) {
  return subscribe((s) => cb({ prompt: s.prompt }));
}
