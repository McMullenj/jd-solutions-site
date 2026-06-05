import { useEffect } from 'react';
import { FinalContact } from './components/FinalContact';
import { FloatingContact } from './components/FloatingContact';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { useReveal } from './hooks/useReveal';
import './styles.css';

const contactHref = 'mailto:hello@jdsolutions.dev';

export function JdSolutionsApp() {
  useReveal();

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return (
    <>
      <Header contactHref={contactHref} />
      <main>
        <Hero />
        <Work />
        <Services />
        <FinalContact contactHref={contactHref} />
      </main>
      <FloatingContact contactHref={contactHref} />
      <div className="cursor-halo" aria-hidden="true" />
    </>
  );
}
