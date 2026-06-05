export function Hero() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-frame">
        <div className="signal-field" aria-hidden="true">
          <span className="scan-line scan-line-a" />
          <span className="scan-line scan-line-b" />
          <span className="grid-plane" />
        </div>

        <div className="hero-content">
          <p className="hero-meta" data-reveal>
            Software development
          </p>
          <h1 id="hero-title" data-reveal>
            <span>JD</span>
            <span>Solutions</span>
          </h1>
          <p className="hero-side-copy" data-reveal>
            Web / Apps / Systems / Automation
          </p>
        </div>

        <div className="hero-footer" data-reveal>
          <span>Perth / Remote</span>
          <span>Build</span>
        </div>
      </div>
    </section>
  );
}

