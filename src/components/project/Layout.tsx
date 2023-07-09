import { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useThemeSwitch from '@/hooks/useThemeSwitch';
import { FiltersContextProvider } from '@/context/filters';
import { Block } from '@/types';

import MobileHeader from '@/components/MobileHeader';
import Filters from '../filters';
import Logo from '../Logo';

type Props = {
  children: ReactNode;
  page: any;
  site: {
    mobile_menu: {
      block_1: Block;
      block_2: Block;
      footer: Block;
    };
  };
};

export default function ProjectLayout({
  children,
  page,
  site,
}: Props) {
  const router = useRouter();
  const theme = useThemeSwitch();

  // update theme on route change
  useEffect(() => {
    if (
      theme &&
      router.pathname !== '/' &&
      theme.theme.name !== 'black'
    ) {
      theme.setTheme('black');
    }
  }, [router, theme]);

  if (!page || !site) return null;

  const { filterGroups } = page;

  return (
    <>
      <Head>
        <title>eytyy</title>
        <meta
          name="description"
          content="Eyas Tayyem freelance creative coder, researcher, strategist and consultant."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid min-h-app grid-cols-8 grid-rows-home-m gap-11 bg-pageBG p-8 text-pageText md:grid-rows-home md:p-14">
        <div className="left relative z-10 row-start-3 md:row-start-1">
          <Filters filterGroups={filterGroups} />
        </div>
        <div className="right hidden md:block">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <header className="col-span-full md:hidden">
          <MobileHeader {...site.mobile_menu} />
        </header>
        <main className="col-span-full col-start-1 row-span-3 row-start-2 md:col-span-4 md:col-start-3 md:row-start-1">
          {children}
        </main>
      </div>
    </>
  );
}
