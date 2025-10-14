"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { subscribe } from '@/lib/store';

export function OutputDrawer() {
  const [open, setOpen] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ presetName: string | null; colorHex: string | null; length: any } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const unsub = subscribe((s) => {
      setImageUrl(s.imageUrl);
      setMeta({ presetName: s.meta.presetName, colorHex: s.meta.colorHex, length: s.meta.length });
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <section className="output-shell" aria-label="Generated output">
      <div className="output-header">
        <div>
          <h2>Latest portrait</h2>
          {meta?.presetName && (
            <p className="output-meta">
              {meta.presetName}
              {meta.colorHex ? ` • ${meta.colorHex}` : ''}
              {meta.length ? ` • ${meta.length}` : ''}
            </p>
          )}
        </div>
        <button
          ref={triggerRef}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="ghost-button"
          type="button"
        >
          {open ? 'Hide' : 'Show'}
        </button>
      </div>
      {open && (
        <div className="output-body">
          {!imageUrl ? (
            <div className="output-placeholder" aria-live="polite">
              Generating portrait… Please wait.
            </div>
          ) : (
            <>
              <div className="output-frame">
                <Image
                  src={imageUrl}
                  alt={`Portrait style: ${meta?.presetName ?? 'Style'}, ${meta?.colorHex ?? 'Color'}${meta?.length ? `, ${meta?.length}` : ''}`}
                  width={768}
                  height={1024}
                  unoptimized
                  priority
                />
              </div>
              <div className="output-actions">
                <button className="primary-button" type="button" onClick={() => download(imageUrl!, meta)}>
                  Download portrait
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

function download(url: string, meta: { presetName: string | null; colorHex: string | null; length: 'bob' | 'shoulder' | 'waist' | null } | null) {
  const a = document.createElement('a');
  a.href = url;
  const timestamp = new Date().toISOString().replaceAll(':', '-');
  const safePreset = (meta?.presetName ?? 'preset').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const safeColor = (meta?.colorHex ?? 'color').replace('#', '');
  const safeLength = (meta?.length ?? 'na').toString();
  const ext = url.startsWith('data:image/') ? url.split(';')[0].split('/')[1] : (url.split('.').pop() || 'png');
  a.download = `sacred-styles_${safePreset}_${safeColor}_${safeLength}_${timestamp}.${ext}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
