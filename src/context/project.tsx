import { ProjectProps } from '@/components/work/ProjectContainer';
import React from 'react';

const ProjectContext = React.createContext<{
  project: ProjectProps;
  activeIdx: number;
  reachedEnd: boolean;
  setReachedEnd: (reachedEnd: boolean) => void;
  setActiveSection: (idx: number) => void;
} | null>(null);

export const useProject = () => {
  const context = React.useContext(ProjectContext);
  if (context === null) {
    throw new Error(
      'useProject must be used within a ProjectProvider'
    );
  }
  return context;
};

export const ProjectProvider = ({
  children,
  project,
}: {
  children: React.ReactNode;
  project: ProjectProps;
}) => {
  const [state, setState] = React.useState({
    activeIdx: 0,
    isMenuOpen: false,
    reachedEnd: false,
  });

  const setReachedEnd = React.useCallback(
    (reachedEnd: boolean) =>
      setState((state) => ({
        ...state,
        reachedEnd,
      })),
    []
  );

  const { activeIdx, isMenuOpen, reachedEnd } = state;

  const setActiveSection = React.useCallback(
    (idx: number) =>
      setState((state) => ({
        ...state,
        activeIdx: idx,
      })),
    []
  );

  return (
    <ProjectContext.Provider
      value={{
        project,
        activeIdx,
        reachedEnd,
        setReachedEnd,
        setActiveSection,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
