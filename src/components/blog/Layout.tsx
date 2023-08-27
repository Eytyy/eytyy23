import { ReactNode } from 'react';
import Head from 'next/head';

import { FiltersContextProvider } from '@/context/filters';
import { SiteProps } from '@/types';

import {
  EpicGrid,
  EpicGridMain,
  EpicGridTopLeft,
  EpicGridTopRight,
} from '../UI';
import Logos from '../Logos';

type Props = {
  children: ReactNode;
  page: any;
  site: SiteProps;
};

export default function BlogLayout({ children, page, site }: Props) {
  if (!page || !site) return null;
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
        <EpicGrid className="min-h-screen bg-black text-white">
          <EpicGridTopRight className="sticky top-16">
            <Logos />
          </EpicGridTopRight>
          <EpicGridMain
            centerContent={false}
            className="main row-span-3 row-start-2 md:row-span-1 md:row-start-1"
          >
            {children}
          </EpicGridMain>
        </EpicGrid>
      </FiltersContextProvider>
    </>
  );
}
