import React, { useEffect, useRef, useState } from 'react';
import { CloudCheck, LogIn, LogOut, Mail } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface AccountMenuProps {
  email: string | null;
  syncing: boolean;
}

/** Email magic-link sign-in. Hidden entirely when Supabase is not configured. */
export const AccountMenu: React.FC<AccountMenuProps> = ({ email, syncing }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [mode, setMode] = useState<'password' | 'link'>('password');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!supabase) return null;

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setState('error');
      setMessage('Email chưa đúng định dạng.');
      return;
    }
    if (mode === 'password' && password.length < 6) {
      setState('error');
      setMessage('Mật khẩu cần ít nhất 6 ký tự.');
      return;
    }
    setState('sending');
    if (mode === 'password') {
      const { error } = await supabase!.auth.signInWithPassword({ email: value, password });
      if (error) {
        setState('error');
        setMessage('Email hoặc mật khẩu không đúng.');
      } else {
        setState('idle');
        setPassword('');
        setOpen(false);
      }
      return;
    }
    const { error } = await supabase!.auth.signInWithOtp({
      email: value,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) {
      setState('error');
      setMessage('Không gửi được liên kết. Vui lòng thử lại.');
    } else {
      setState('sent');
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={email ? `Tài khoản ${email}` : 'Đăng nhập để đồng bộ tiến độ'}
        title={email ? email : "Đăng nhập để đồng bộ tiến độ"}
        className={`flex h-9 items-center gap-2 rounded-xl border px-2.5 text-sm font-medium ${
          email ? 'border-slate-700 text-slate-200 hover:bg-slate-800' : 'border-orange-500/60 text-orange-300 hover:bg-orange-500/10'
        }`}
      >
        {email ? <CloudCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" /> : <LogIn className="h-4 w-4" aria-hidden="true" />}
        <span className="hidden 2xl:inline">{email ? (syncing ? 'Đang đồng bộ' : 'Đã đồng bộ') : 'Đăng nhập'}</span>
      </button>

      {open && (
        <div role="dialog" aria-label="Tài khoản" className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-black/40">
          {email ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400">Đang đăng nhập</p>
                <p className="mt-1 truncate text-sm font-medium text-slate-50">{email}</p>
              </div>
              <p className="text-sm text-slate-300">Tiến độ học, bookmark và lịch sử làm bài được lưu trên Supabase và dùng được ở mọi thiết bị.</p>
              <button
                onClick={async () => { await supabase!.auth.signOut(); setOpen(false); }}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-800"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" /> Đăng xuất
              </button>
            </div>
          ) : state === 'sent' ? (
            <div className="space-y-2">
              <Mail className="h-6 w-6 text-orange-400" aria-hidden="true" />
              <p className="text-sm font-medium text-slate-50">Kiểm tra hộp thư của bạn</p>
              <p className="text-sm text-slate-300">Liên kết đăng nhập đã gửi tới {value}. Mở nó trên thiết bị này để tiếp tục.</p>
            </div>
          ) : (
            <form onSubmit={send} noValidate className="space-y-3">
              <p className="text-sm font-medium text-slate-50">Lưu tiến độ lên cloud</p>
              <p className="text-sm text-slate-300">
                {mode === 'password' ? 'Đăng nhập bằng email và mật khẩu.' : 'Nhập email, chúng tôi gửi liên kết đăng nhập, không cần mật khẩu.'}
              </p>
              <div>
                <label htmlFor="acct-email" className="mb-1.5 block text-xs text-slate-400">Email</label>
                <input
                  id="acct-email"
                  type="email"
                  autoComplete="email"
                  value={value}
                  onChange={(e) => { setValue(e.target.value); if (state === 'error') setState('idle'); }}
                  aria-invalid={state === 'error'}
                  aria-describedby={state === 'error' ? 'acct-err' : undefined}
                  className="h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 focus:border-orange-500 focus:outline-none"
                />
              </div>
              {mode === 'password' && (
                <div>
                  <label htmlFor="acct-pass" className="mb-1.5 block text-xs text-slate-400">Mật khẩu</label>
                  <input
                    id="acct-pass"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (state === 'error') setState('idle'); }}
                    className="h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              )}
              {state === 'error' && <p id="acct-err" role="alert" className="text-xs text-rose-400">{message}</p>}
              <button
                type="submit"
                disabled={state === 'sending'}
                className="h-10 w-full rounded-lg bg-orange-500 text-sm font-semibold text-slate-950 hover:bg-orange-400 disabled:opacity-60"
              >
                {state === 'sending' ? 'Đang xử lý' : mode === 'password' ? 'Đăng nhập' : 'Gửi liên kết đăng nhập'}
              </button>
              <button
                type="button"
                onClick={() => { setMode(mode === 'password' ? 'link' : 'password'); setState('idle'); }}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-200"
              >
                {mode === 'password' ? 'Dùng liên kết qua email' : 'Dùng mật khẩu'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
