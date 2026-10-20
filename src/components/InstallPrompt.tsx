import React, { useEffect, useState } from 'react';
import { Download, Share, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'aws_ccp_install_dismissed';

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;

const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

/** Offers "install as an app": native prompt where the browser supports it, instructions on iOS Safari. */
export const InstallPrompt: React.FC = () => {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try { return localStorage.getItem(DISMISS_KEY) === '1'; } catch { return false; }
  });
  const [installed, setInstalled] = useState<boolean>(() => isStandalone());

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => { setInstalled(true); setDeferred(null); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try { localStorage.setItem(DISMISS_KEY, '1'); } catch { /* ignore */ }
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    if (outcome === 'dismissed') dismiss();
  };

  if (installed || dismissed) return null;
  const ios = isIos();
  if (!deferred && !ios) return null;

  return (
    <div
      role="dialog"
      aria-label="Cài đặt ứng dụng"
      className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-white/[0.1] bg-slate-900/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:inset-x-auto sm:right-4"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <img src="/icons/icon-192.png" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-50">Cài app lên màn hình chính</p>
        {deferred ? (
          <p className="mt-0.5 text-xs leading-relaxed text-slate-300">Mở nhanh như app điện thoại, dùng được cả khi mất mạng.</p>
        ) : (
          <p className="mt-0.5 text-xs leading-relaxed text-slate-300">
            Trên Safari, bấm <Share className="mx-0.5 inline h-3.5 w-3.5 align-text-bottom" aria-label="nút Chia sẻ" /> rồi chọn{' '}
            <span className="font-medium text-slate-100">Thêm vào MH chính</span>.
          </p>
        )}
        {deferred && (
          <button
            onClick={install}
            className="mt-3 flex h-9 items-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-slate-950 hover:bg-orange-400"
          >
            <Download className="h-4 w-4" aria-hidden="true" /> Cài đặt
          </button>
        )}
      </div>
      <button onClick={dismiss} aria-label="Đóng" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:text-white">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
