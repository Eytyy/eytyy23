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

export default function BlogLayout({ children, page, site }: Props) {
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
  const { leftCol, rightCol, footer } = page;

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
      <FiltersContextProvider>
        <div className="page-grid grid-rows-blog-m md:grid-rows-blog">
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
          <main className="main row-span-3 row-start-2 md:row-span-1 md:row-start-1">
            {children}
          </main>
        </div>
      </FiltersContextProvider>
    </>
  );
}
