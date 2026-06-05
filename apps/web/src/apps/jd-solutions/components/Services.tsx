import { useState } from 'react';
import { services } from '../data';

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section className="services-section dark-section" id="studio" aria-labelledby="services-title">
      <div className="section-label" data-reveal>
        What we do
      </div>
      <h2 id="services-title" data-reveal>
        Services
      </h2>

      <div className="service-list">
        {services.map((service, index) => {
          const isActive = active === index;

          return (
            <button
              key={service.id}
              className={`service-row ${isActive ? 'is-active' : ''}`}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-expanded={isActive}
            >
              <span className="service-id">{service.id}</span>
              <span className="service-main">{service.label}</span>
              <span className="service-tags" aria-hidden={!isActive}>
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </span>
              <span className="service-toggle">{isActive ? '-' : '+'}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
