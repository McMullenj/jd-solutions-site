import { Link, useLocation } from 'react-router-dom';
import { scrollToFeatures } from '../scrollToFeatures';
import { SplitFrameLogo } from './SplitFrameLogo';

type NavItem =
  | { label: string; href: string; hash: string; scroll?: false }
  | { label: string; href: string; hash: string; scroll: true };

const navItems: NavItem[] = [
  { label: 'Overview', href: '/split-frame', hash: '' },
  { label: 'Features', href: '/split-frame', hash: '#features', scroll: true },
  { label: 'Build', href: '/split-frame', hash: '#features', scroll: true },
];

export function SplitFrameHeader() {
  const { pathname } = useLocation();
  const onSplitFrame = pathname.startsWith('/split-frame');

  return (
    <header className="sf-header">
      <div className="sf-shell sf-header__inner">
        <Link className="sf-brand" to="/split-frame" aria-label="Split Frame home">
          <SplitFrameLogo className="sf-brand__mark" />
          <span className="sf-brand__name">Split Frame</span>
        </Link>

        <nav className="sf-nav" aria-label="Split Frame">
          {navItems.map((item) => {
            const isOverview = item.label === 'Overview';
            const isActive = onSplitFrame && isOverview;

            if (item.scroll) {
              return (
                <button
                  key={item.label}
                  type="button"
                  className="sf-nav__link sf-nav__link--button"
                  onClick={scrollToFeatures}
                >
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                className={`sf-nav__link${isActive ? ' is-active' : ''}`}
                to={`${item.href}${item.hash}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="sf-header__actions">
          <a className="sf-nav__link" href="/split-frame/app/login">
            Login
          </a>
          <button type="button" className="sf-btn sf-btn--primary sf-header__cta" onClick={scrollToFeatures}>
            Pre-order
          </button>
        </div>
      </div>
    </header>
  );
}
