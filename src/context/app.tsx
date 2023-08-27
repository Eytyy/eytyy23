import { SiteProps } from '@/types';
import React, { useEffect } from 'react';

const AppContext = React.createContext<{
  settings: SiteProps['settings'];
  isMenuOpen: boolean;
  toggleMenu: (visible: boolean) => void;
} | null>(null);

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (context === null) {
    throw new Error('useApp must be used within a AppProvider');
  }
  return context;
};

type State = {
  isMenuOpen: boolean;
};

export const AppProvider = ({
  children,
  site,
}: {
  children: React.ReactNode;
  site: SiteProps;
}) => {
  const [state, setState] = React.useState<State>({
    isMenuOpen: false,
  });

  useEffect(() => {
    if (state.isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [state.isMenuOpen]);

  const toggleMenu = React.useCallback(
    (visible: boolean) =>
      setState((state) => ({
        ...state,
        isMenuOpen: visible,
      })),
    []
  );

  return (
    <AppContext.Provider
      value={{
        settings: site?.settings || {},
        isMenuOpen: state.isMenuOpen,
        toggleMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
