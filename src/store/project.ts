import { ProjectProps } from '@/components/work/ProjectDisplay';
import { create } from 'zustand';

export const useProject = create<{
  activeProject: ProjectProps | null;
  reachedEnd: boolean;
  setReachedEnd: (reachedEnd: boolean) => void;
  setActiveSection: (idx: number) => void;
  init: (project: ProjectProps | null) => void;
}>((set) => ({
  activeProject: null,
  reachedEnd: false,
  init: (project) =>
    set((state) => ({
      ...state,
      activeProject: project,
      reachedEnd: false,
    })),
  setReachedEnd: (reachedEnd) =>
    set((state) => ({ ...state, reachedEnd })),
  setActiveSection: (idx) =>
    set((state) => ({ ...state, activeIdx: idx })),
}));
