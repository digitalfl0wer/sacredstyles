import { Controls } from '@/components/Controls';
import { OutputDrawer } from '@/components/OutputDrawer';

export default function HomePage() {
  return (
    <main className="home-shell">
      <div className="home-layout">
        <aside className="control-panel">
          <div className="brand-lockup">
            <h1>Sacred Styles</h1>
            <p>Where Black hair is honored.</p>
          </div>
          <Controls />
        </aside>
        <section className="preview-panel">
          <OutputDrawer />
        </section>
      </div>
    </main>
  );
}
