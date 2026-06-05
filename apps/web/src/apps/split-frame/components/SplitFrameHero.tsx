import { scrollToFeatures } from '../scrollToFeatures';

export function SplitFrameHero() {
  return (
    <section className="sf-hero" aria-labelledby="sf-hero-title">
      <div className="sf-shell sf-shell--hero">
        <div className="sf-hero__copy">
          <h1 id="sf-hero-title" className="sf-hero__title">
            <span className="sf-hero__title-line">Your training.</span>
            <span className="sf-hero__title-line">
              Always in view<span className="sf-hero__title-period" aria-hidden="true">.</span>
            </span>
          </h1>
          <p className="sf-hero__lede">
            A minimal e-paper display that keeps your Strava stats front and centre.
          </p>
          <div className="sf-hero__actions">
            <button type="button" className="sf-btn sf-btn--primary" onClick={scrollToFeatures}>
              Pre-order now
              <span className="sf-btn__arrow" aria-hidden="true">
                →
              </span>
            </button>
            <button type="button" className="sf-hero__secondary" onClick={scrollToFeatures}>
              See features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
