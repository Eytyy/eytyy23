import { SiteProps } from '@/types';
import React from 'react';

const AppContext = React.createContext<{
  menus: SiteProps['menus'];
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
  const [footerVisible, setFooterVisible] = React.useState(false);

  return (
    <AppContext.Provider
      value={{
        menus: site?.menus,
        footerVisible,
        setFooterVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
