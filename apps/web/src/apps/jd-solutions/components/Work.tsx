import { Link } from 'react-router-dom';
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

          if (tile.href) {
            return (
              <Link className={className} to={tile.href} key={tile.label}>
                {content}
              </Link>
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

