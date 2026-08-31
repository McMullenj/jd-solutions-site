import { useState } from 'react';

const splitFrameUrl = 'https://split-frame.netlify.app';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Split Frame', href: splitFrameUrl, isExternal: true },
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
          'isExternal' in item && item.isExternal ? (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
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
          'isExternal' in item && item.isExternal ? (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              {item.label}
            </a>
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
