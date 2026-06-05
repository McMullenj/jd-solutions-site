type IconProps = {
  className?: string;
};

export function WifiIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12.5a11 11 0 0 1 14 0" strokeLinecap="round" />
      <path d="M8.5 16a6 6 0 0 1 7 0" strokeLinecap="round" />
      <path d="M12 19.5h.01" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}

export function FrameIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 9h8M8 13h5" strokeLinecap="round" />
    </svg>
  );
}

export function UsbIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 4v8" strokeLinecap="round" />
      <path d="M9 7h6" strokeLinecap="round" />
      <rect x="8" y="12" width="8" height="8" rx="2" />
      <path d="M10 16h4" strokeLinecap="round" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3.2 7.4-7 9-3.8-1.6-7-4.5-7-9V6l7-3z" />
      <path d="M9.5 12.5l2 2 3.5-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
