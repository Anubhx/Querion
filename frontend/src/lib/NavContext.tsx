'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type View = 'dashboard' | 'history' | 'reports' | 'scheduled';

interface NavContextValue {
  activeView: View;
  setActiveView: (v: View) => void;
}

const NavContext = createContext<NavContextValue>({
  activeView: 'dashboard',
  setActiveView: () => {},
});

export function NavProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<View>('dashboard');
  return (
    <NavContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  return useContext(NavContext);
}
