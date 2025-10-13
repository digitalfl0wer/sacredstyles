import { Controls } from '@/components/Controls';
import { OutputDrawer } from '@/components/OutputDrawer';

export default function HomePage() {
  return (
    <main style={{ display: 'grid', gridTemplateColumns: '340px 1fr', minHeight: '100vh' }}>
      <aside style={{ padding: 24, borderRight: '1px solid #e5e5e5' }}>
        <h1 style={{ margin: 0 }}>Sacred Styles</h1>
        <p style={{ marginTop: 4 }}>Where Black hair is honored.</p>
        <Controls />
      </aside>
      <section>
        <OutputDrawer />
      </section>
    </main>
  );
}

