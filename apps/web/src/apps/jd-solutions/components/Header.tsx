import { useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Split Frame', href: '/split-frame', isRoute: true },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
] as const;

type HeaderProps = {
  contactHref: string;
};

export function Header({ contactHref }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" data-reveal>
      <a className="brand-mark" href="#top" aria-label="JD Solutions home">
        <span>JD</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) =>
          'isRoute' in item && item.isRoute ? (
            <Link key={item.label} to={item.href}>
              {item.label}
            </Link>
          ) : (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ),
        )}
      </nav>

      <a className="header-cta" href={contactHref}>
        Build
      </a>

      <button
        className="menu-button"
        type="button"
        aria-controls="mobile-menu"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`}>
        {navItems.map((item) =>
          'isRoute' in item && item.isRoute ? (
            <Link key={item.label} to={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ) : (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ),
        )}
        <a href={contactHref} onClick={() => setOpen(false)}>
          Build
        </a>
      </div>
    </header>
  );
}
