import { SplitFrameFeatures } from './components/SplitFrameFeatures';
import { SplitFrameFooter } from './components/SplitFrameFooter';
import { SplitFrameHeader } from './components/SplitFrameHeader';
import { SplitFrameHero } from './components/SplitFrameHero';
import './split-frame.css';

const heroBackground = '/split-frame/web-page-background.png';

export function SplitFrameApp() {
  return (
    <div className="sf-page">
      <div
        className="sf-stage"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <SplitFrameHeader />
        <SplitFrameHero />
      </div>

      <div className="sf-shell sf-shell--lower">
        <SplitFrameFeatures />
        <SplitFrameFooter />
      </div>
    </div>
  );
}
