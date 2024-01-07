import React from 'react';
import { create } from 'zustand';

import useResizeAppHeight from '@/hooks/useResizeAppHeight';

import MainBlock from '@/components/blocks/Main';
import Alert from '@/components/AlertBanner';
import Container from '@/components/ui/Container';
import FrontHeader from './FrontHeader';

import type { MenuType, NavBlogType } from '@/components/navigation/types';
import type { MainBlocks, PageProps, SiteProps } from '@/types';
import { useApp } from '@/context/app';

export type BlogMenu = {
  title: string;
  items: NavBlogType[];
};

export type FrontProps = {
  page: PageProps;
  work: MenuType
  blog: BlogMenu
}

type Props = {
  page: FrontProps;
  site: SiteProps;
  preview?: boolean;
  loading?: boolean;
};

interface ThemeState {
  theme: 'blue' | 'black' | 'white';
  setTheme: (theme: ThemeState['theme']) => void;
}


export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'white',
  setTheme: (theme) => set({ theme }),
}))

export default function FrontDisplay(props: Props) {
  const { preview, loading, page } = props;
  const theme = useThemeStore(state => state.theme)
  const {isMenuOpen} = useApp()
  useResizeAppHeight();

  if (!page) return null;

  return (
    <>
      <Container theme={theme}>
        <FrontHeader
          menus={{
            work: page.work,
            blog: page.blog,
          }}
          theme={theme}
          front={true}
        />
        <div className="h-[var(--app-height)] relative">
          <Alert preview={preview} loading={loading} />
          {!isMenuOpen && page.page.main?.map((block: MainBlocks) => (
            <MainBlock key={block._key} block={block} />
           ))}
        </div>
      </Container>
    </>
  );
}
