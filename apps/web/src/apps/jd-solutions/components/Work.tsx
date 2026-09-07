import { workTiles } from '../data';

export function Work() {
  return (
    <section className="work-section light-section" id="work" aria-labelledby="work-title">
      <div className="section-label" data-reveal>
        Selected work
      </div>
      <h2 id="work-title" data-reveal>
        Build systems.
      </h2>

      <div className="work-track" data-reveal>
        {workTiles.map((tile) => {
          const className = `work-tile tone-${tile.tone}`;
          const content = (
            <>
              <span className="tile-meta">{tile.meta}</span>
              <span className="tile-label">{tile.label}</span>
              <span className="tile-art" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </>
          );

          // Product subsites are served by Netlify (proxy or static), not JD React routes.
          if (tile.href) {
            return (
              <a className={className} href={tile.href} key={tile.label}>
                {content}
              </a>
            );
          }

          return (
            <a className={className} href="#contact" key={tile.label}>
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}
