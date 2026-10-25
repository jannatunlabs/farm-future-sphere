import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Loader2, MailCheck } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brand, nav } from '@/components/terrafarm/ui';

type AppPath = (typeof nav)[number]['to'];
const appPaths: readonly string[] = nav.map((n) => n.to);

export const Route = createFileRoute('/auth')({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect:
      typeof search.redirect === 'string' && appPaths.includes(search.redirect)
        ? (search.redirect as AppPath)
        : ('/' as AppPath),
  }),
  head: () => ({
    meta: [
      { title: 'Sign in — AgroMind' },
      { name: 'description', content: 'Sign in or create an AgroMind account to save your farm analyses and scenarios.' },
      { property: 'og:title', content: 'Sign in — AgroMind' },
      { property: 'og:description', content: 'Sign in or create an AgroMind account to save your farm analyses and scenarios.' },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error('Enter a valid email address');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setBusy(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email: trimmed, password });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success('Welcome back');
        navigate({ to: redirect });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: trimmed,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        if (!data.session) {
          setConfirmSent(true);
        } else {
          toast.success('Account created');
          navigate({ to: redirect });
        }
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleSocial(provider: 'google' | 'lovable') {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error(result.error.message ?? 'Sign-in failed');
      return;
    }
    if (result.redirected) return; // browser is navigating to the provider
    setBusy(false);
    navigate({ to: redirect });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand"><Brand /></div>
        {confirmSent ? (
          <div className="auth-success">
            <span className="auth-success-icon"><MailCheck size={26} /></span>
            <h1>Check your email</h1>
            <p>We sent a confirmation link to <strong>{email.trim()}</strong>. Click it to activate your account, then come back to sign in.</p>
            <Button variant="outline" onClick={() => { setConfirmSent(false); setMode('signin'); }}>Back to sign in</Button>
          </div>
        ) : (
          <>
            <h1>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
            <p className="auth-sub">{mode === 'signin' ? 'Sign in to save your farm analyses and scenarios.' : 'One account for your fields, crops and climate scenarios.'}</p>
            <div className="auth-social">
              <Button variant="outline" disabled={busy} onClick={() => handleSocial('google')}>Continue with Google</Button>
              <Button variant="outline" disabled={busy} onClick={() => handleSocial('lovable')}>Sign in with Lovable</Button>
            </div>
            <div className="auth-or"><span>or with email</span></div>
            <form onSubmit={handleEmail} className="auth-form">
              <div className="auth-field">
                <Label htmlFor="auth-email">Email</Label>
                <Input id="auth-email" type="email" autoComplete="email" placeholder="you@farm.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="auth-field">
                <Label htmlFor="auth-password">Password</Label>
                <Input id="auth-password" type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              </div>
              <Button type="submit" disabled={busy} className="auth-submit">
                {busy && <Loader2 className="animate-spin" size={16} />}
                {mode === 'signin' ? 'Sign in' : 'Create account'}
              </Button>
            </form>
            <button type="button" className="auth-switch" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
              {mode === 'signin' ? "New here? Create an account" : 'Already have an account? Sign in'}
            </button>
          </>
        )}
        <p className="auth-note">The demo farm stays open to everyone — an account is only needed to save your own work.</p>
      </div>
    </div>
  );
}
