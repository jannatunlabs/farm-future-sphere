import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { ArrowRight, ChevronDown, CircleHelp, FlaskConical, Home, Leaf, LogOut, Map, Menu, PanelLeftClose, ScanSearch, ShieldAlert, TrendingUp, X, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/hooks/use-session';
import agromindIcon from '@/assets/agromind-icon.png.asset.json';
import satellite from '@/assets/farm-satellite.jpg';

export const nav = [
  { label: 'Overview', to: '/', icon: Home },
  { label: 'Select land', to: '/select-land', icon: Map },
  { label: 'Land intelligence', to: '/intelligence', icon: ScanSearch },
  { label: 'Crop advisor', to: '/crops', icon: Leaf },
  { label: 'Profit simulator', to: '/profit', icon: TrendingUp },
  { label: 'Risk center', to: '/risks', icon: ShieldAlert },
  { label: 'Future simulation', to: '/simulation', icon: Play },
  { label: 'Scenario lab', to: '/scenarios', icon: FlaskConical },
] as const;
export const nextStep: Record<string, { label: string, to: typeof nav[number]['to'] }> = {
  '/select-land': { label: 'View land intelligence', to: '/intelligence' },
  '/intelligence': { label: 'Explore crops', to: '/crops' },
  '/crops': { label: 'Compare profits', to: '/profit' },
  '/profit': { label: 'Explore risks', to: '/risks' },
  '/risks': { label: 'Simulate the future', to: '/simulation' },
  '/simulation': { label: 'Open scenario lab', to: '/scenarios' },
};
export function Brand() { return <Link to="/" className="brand"><span className="brand-mark"><img src={agromindIcon.url} alt="AgroMind logo" /></span><span>agro<span className="text-primary">mind</span></span></Link>; }
function AuthControl() {
  const { user, loading } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  if (loading) return null;
  if (!user) return <Button variant="outline" size="sm" asChild><Link to="/auth">Sign in</Link></Button>;
  const initials = (user.email ?? 'A').slice(0, 2).toUpperCase();
  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: '/auth', replace: true });
  }
  return <div className="auth-control"><span className="topbar-avatar" title={user.email ?? undefined}>{initials}</span><Button variant="ghost" size="icon" onClick={signOut} aria-label="Sign out" title="Sign out"><LogOut size={15} /></Button></div>;
}
export function AppShell({ children, title, eyebrow, description, action }: { children: ReactNode, title: string, eyebrow: string, description?: string, action?: ReactNode }) {
  const path = useRouterState({ select: s => s.location.pathname });
  const [open, setOpen] = useState(false);
  return <div className="app-frame">
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top"><Brand /><Button variant="ghost" size="icon" className="mobile-only" onClick={() => setOpen(false)} aria-label="Close menu"><X /></Button></div>
      <div className="side-group-label">WORKSPACE <span>01 / 01</span></div>
      <div className="farm-switch"><span className="farm-switch-icon"><Leaf size={18}/></span><span><strong>North Field Farm</strong><small>Story County, Iowa</small></span><ChevronDown size={14}/></div>
      <div className="side-group-label side-nav-label">EXPLORE</div>
      <nav className="side-nav" aria-label="Main navigation">{nav.map(item => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={`nav-item ${path === item.to ? 'nav-active' : ''}`}><item.icon size={18} strokeWidth={1.8}/><span>{item.label}</span>{item.to === '/simulation' && <span className="new-pill">WOW</span>}</Link>)}</nav>
      <div className="sidebar-bottom"><div className="signal"><span className="signal-dot"/> DEMO ENVIRONMENT <span className="signal-right">LIVE</span></div><div className="sidebar-help"><CircleHelp size={16}/> Model-based educational demo</div></div>
    </aside>
    {open && <div className="mobile-scrim" onClick={() => setOpen(false)}/>}
    <div className="main-column">
      <header className="app-topbar"><Button variant="ghost" size="icon" className="mobile-menu" onClick={() => setOpen(true)} aria-label="Open menu"><Menu/></Button><div className="topbar-trail"><span>WORKSPACE</span><span className="slash">/</span><strong>{title}</strong></div><div className="topbar-right"><span className="topbar-data"><span className="signal-dot"/> DEMO DATA ACTIVE</span><AuthControl /></div></header>
      <main className="page-content"><div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div className="heading-action">{action}</div>}</div>{children}{nextStep[path] && <div className="next-row"><span>CONTINUE YOUR ANALYSIS</span><Button variant="outline" asChild><Link to={nextStep[path].to}>{nextStep[path].label}<ArrowRight size={16}/></Link></Button></div>}</main>
      <footer className="app-footer"><span>© 2026 AgroMind · Space Apps demo</span><span>Model-based educational scenarios · Not guaranteed predictions</span></footer>
    </div>
  </div>;
}
export function Kicker({ children }: {children: ReactNode}) { return <div className="section-kicker">{children}</div>; }
export function SectionHead({ title, subtitle, right }: { title: string, subtitle?: string, right?: ReactNode }) { return <div className="section-head"><div><Kicker>{subtitle || 'INSIGHTS'}</Kicker><h2>{title}</h2></div>{right}</div>; }
export function Stat({ icon: Icon, label, value, detail, accent = 'cyan' }: { icon: typeof Leaf, label: string, value: string, detail: string, accent?: 'cyan' | 'green' | 'amber' }) { return <div className="stat-card"><div className={`stat-icon ${accent}`}><Icon size={19}/></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-detail">{detail}</div></div>; }
export function FarmMap({ layer = 'Satellite', simulated = false, stage = 0, onMapClick, points }: { layer?: string | undefined, simulated?: boolean | undefined, stage?: number | undefined, onMapClick?: (x: number, y: number) => void | undefined, points?: {x:number,y:number}[] | undefined }) {
  const [zoom, setZoom] = useState(1);
  const polygon = points && points.length > 2 ? points.map(p => `${p.x},${p.y}`).join(' ') : '32,28 65,25 70,68 35,73';
  return <div className={`farm-map ${simulated ? 'simulation-map' : ''} ${layer === 'Vegetation' ? 'map-vegetation' : ''} ${layer === 'Temperature' ? 'map-temperature' : ''} ${layer === 'Rainfall' ? 'map-rainfall' : ''} ${layer === 'Flood risk' ? 'map-flood' : ''} ${layer === 'Drought risk' ? 'map-drought' : ''} ${layer === 'Elevation' ? 'map-elevation' : ''}`}>
    <img src={satellite} alt="Satellite view of the North Field Farm landscape" className="map-image" style={{ transform: `scale(${zoom})` }} width={1408} height={1008} loading="lazy" />
    <div className="map-shade"/>
    {onMapClick && <div className="map-click-capture" onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); onMapClick(Math.round((e.clientX - rect.left) / rect.width * 100), Math.round((e.clientY - rect.top) / rect.height * 100)); }} aria-label="Click to add farm boundary points"/>}
    <svg className="map-boundary" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polygon points={polygon} className="field-fill"/><polygon points={polygon} className="field-outline"/>{points?.map((p,i) => <circle key={i} cx={p.x} cy={p.y} r=".65" className="boundary-point"/>)}</svg>
    {simulated && <div className={`weather-effect weather-${stage}`}><div className="rain-lines"/><div className="flood-water"/><div className="risk-zone risk-zone-one"/><div className="risk-zone risk-zone-two"/></div>}
    <div className="map-top-label"><span className="signal-dot"/> {simulated ? 'SCENARIO VIEW' : layer.toUpperCase() + ' VIEW'}</div>
    <div className="map-field-tag"><span className="map-field-dot"/> NORTH FIELD <small>42.1° N, 93.5° W</small></div>
    <div className="map-controls"><Button variant="outline" size="icon" onClick={() => setZoom(v => Math.min(v + .2, 1.8))} aria-label="Zoom in">+</Button><Button variant="outline" size="icon" onClick={() => setZoom(v => Math.max(v - .2, 1))} aria-label="Zoom out">−</Button></div>
    <div className="map-attribution">SATELLITE DEMO IMAGERY · NOT LIVE</div>
  </div>;
}
export function DemoBadge() { return <span className="demo-badge"><Sparkles size={13}/> PRE-FILLED DEMO FARM</span>; }
