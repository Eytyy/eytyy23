import { SiteProps } from '@/types';
import React, { useCallback, useState } from 'react';

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

export const AppProvider = ({ children, site }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [footerVisible, setFooterVisible] = React.useState(false);

  const toggleMenu = useCallback(
    (visible: boolean) => setIsMenuOpen(visible),
    []
  );

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
