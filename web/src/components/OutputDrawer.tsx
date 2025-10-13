"use client";
import { useEffect, useRef, useState } from 'react';
import { subscribe } from '@/lib/store';

export function OutputDrawer() {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ presetName: string | null; colorHex: string | null; length: any } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

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
    return subscribe((s) => {
      setImageUrl(s.imageUrl);
      setMeta({ presetName: s.meta.presetName, colorHex: s.meta.colorHex, length: s.meta.length });
    });
  }, []);

  return (
    <div>
      <div style={{ padding: 16, borderBottom: '1px solid #e5e5e5' }}>
        <button ref={triggerRef} onClick={() => setOpen((v) => !v)} aria-expanded={open} >
          {open ? 'Hide Output' : 'Show Output'}
        </button>
      </div>
      {open && (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Generated output"
          style={{ padding: 24 }}
        >
          {!imageUrl ? (
            <div aria-live="polite">Generating portrait… Please wait.</div>
          ) : (
            <div>
              <img
                src={imageUrl}
                alt={`Portrait style: ${meta?.presetName ?? 'Style'}, ${meta?.colorHex ?? 'Color'}${meta?.length ? `, ${meta?.length}` : ''}`}
                style={{ maxWidth: '100%' }}
              />
              <div style={{ marginTop: 8 }}>
                <button type="button" onClick={() => download(imageUrl!, meta)}>
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
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

