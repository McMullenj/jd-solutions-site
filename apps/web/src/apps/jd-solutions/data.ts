export type Service = {
  id: string;
  label: string;
  tags: string[];
};

export type WorkTile = {
  label: string;
  meta: string;
  tone: 'ink' | 'paper' | 'signal' | 'steel';
  href?: string;
};

export const services: Service[] = [
  { id: '001', label: 'Web', tags: ['Sites', 'Portals', 'Commerce'] },
  { id: '002', label: 'Apps', tags: ['iOS', 'Android', 'Dashboards'] },
  { id: '003', label: 'Systems', tags: ['APIs', 'Data', 'Ops'] },
  { id: '004', label: 'Automation', tags: ['Workflows', 'AI', 'Integrations'] },
];

export const workTiles: WorkTile[] = [
  { label: 'Split Frame', meta: '01', tone: 'ink', href: 'https://split-frame.netlify.app' },
  { label: 'Product', meta: '02', tone: 'paper' },
  { label: 'Platform', meta: '03', tone: 'signal' },
  { label: 'Internal Tool', meta: '04', tone: 'steel' },
  { label: 'Automation', meta: '05', tone: 'ink' },
];

