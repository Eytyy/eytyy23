import { SiteProps } from '@/types';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const AppContext = React.createContext<{
  menus: SiteProps['menus'];
  isMenuOpen: boolean;
  toggleMenu: (visible: boolean) => void;
  footerVisible: boolean;
  setFooterVisible: (visible: boolean) => void;
} | null>(null);

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (context === null) {
    throw new Error('useApp must be used within a AppProvider');
  }
  return context;
};

type Props = {
  children: React.ReactNode;
  site: SiteProps;
};
const openPaths = ['/contact']

export const AppProvider = ({ children, site }: Props) => {
  const { asPath, events } = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(openPaths.includes(asPath));
  const [footerVisible, setFooterVisible] = React.useState(false);

  const toggleMenu = useCallback(
    (visible: boolean) => setIsMenuOpen(visible),
    []
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);


  useEffect(() => {
    const handleRouteChange = () => toggleMenu(false);
    const handleRouteChangeComplete = () => {
      if (openPaths.includes(asPath)) {
        toggleMenu(true)
      }
    };
    events.on('routeChangeStart', handleRouteChange);
    events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      events.off('routeChangeStart', handleRouteChange);
      events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [events, toggleMenu, asPath]);



  return (
    <AppContext.Provider
      value={{
        menus: site?.menus,
        footerVisible,
        isMenuOpen,
        toggleMenu,
        setFooterVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
