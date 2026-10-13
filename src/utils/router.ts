import { useSyncExternalStore } from 'react';

export type Tab = 'study' | 'cheatsheet' | 'exam' | 'manage';

export interface Route {
  tab: Tab;
  /** Lecture id on /study/:id, exam id on /exam/:id. */
  id?: string;
}

const TABS: Tab[] = ['study', 'cheatsheet', 'exam', 'manage'];

export const parsePath = (pathname: string): Route => {
  const [first, second] = pathname.split('/').filter(Boolean).map(decodeURIComponent);
  const tab = TABS.find((t) => t === first) ?? 'study';
  return { tab, id: tab === 'study' || tab === 'exam' ? second : undefined };
};

export const buildPath = (tab: Tab, id?: string): string =>
  `/${tab}${id ? `/${encodeURIComponent(id)}` : ''}`;

const EVENT = 'app:routechange';

export const navigate = (path: string, opts: { replace?: boolean } = {}): void => {
  if (window.location.pathname === path) return;
  window.history[opts.replace ? 'replaceState' : 'pushState']({}, '', path);
  window.dispatchEvent(new Event(EVENT));
};

const subscribe = (cb: () => void) => {
  window.addEventListener('popstate', cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener('popstate', cb);
    window.removeEventListener(EVENT, cb);
  };
};

const snapshot = () => window.location.pathname;

/** Current route; re-renders on back/forward and on navigate(). */
export const useRoute = (): Route => parsePath(useSyncExternalStore(subscribe, snapshot));
