import type { ReactNode } from 'react';
import { FrameIcon, ShieldIcon, SunIcon, UsbIcon, WifiIcon } from './FeatureIcons';

type Feature = {
  title: string;
  description: [string, string];
  icon: ReactNode;
};

const features: Feature[] = [
  {
    title: 'Syncs with Strava',
    description: ['Automatic updates via', 'webhooks. No effort.'],
    icon: <WifiIcon />,
  },
  {
    title: 'E-paper display',
    description: ['Glare-free, ultra low power.', 'Always on.'],
    icon: <SunIcon />,
  },
  {
    title: 'Minimal design',
    description: ['Clean, distraction free.', 'Built to sit anywhere.'],
    icon: <FrameIcon />,
  },
  {
    title: 'USB-C powered',
    description: ["Plug in and it's ready.", 'No battery to worry about.'],
    icon: <UsbIcon />,
  },
  {
    title: 'Private by design',
    description: ['Your data stays yours.', 'Only you. Always.'],
    icon: <ShieldIcon />,
  },
];

export function SplitFrameFeatures() {
  return (
    <section className="sf-features-wrap" id="features" aria-labelledby="sf-features-title">
      <div className="sf-features">
        <h2 id="sf-features-title" className="visually-hidden">
          Features
        </h2>
        <ul className="sf-features__grid">
          {features.map((feature) => (
            <li key={feature.title} className="sf-feature">
              <div className="sf-feature__icon" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="sf-feature__title">{feature.title}</h3>
              <p className="sf-feature__desc" aria-label={feature.description.join(' ')}>
                {feature.description.map((line) => (
                  <span key={line} aria-hidden="true">
                    {line}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
