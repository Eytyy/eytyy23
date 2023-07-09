import Head from 'next/head';
import React, { ReactNode, useEffect, useState } from 'react';
import ColumnBlock from '@/components/blocks/Column';
import LeftCol from './LeftCol';
import RightCol from './RightCol';
import { Block } from '@/types';
import MobileHeader from './MobileHeader';
import { useRouter } from 'next/router';
import useThemeSwitch from '@/hooks/useThemeSwitch';

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

export default function PortfolioLayout({
  children,
  page,
  site,
}: Props) {
  if (!page) return null;

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
      <div className="bg-pageBG transition-colors duration-300 ease-linear">
        <div className="grid min-h-app grid-cols-8 grid-rows-home-m p-8 text-pageText md:grid-rows-home md:p-14">
          <div className="relative col-span-2 col-start-1 row-span-4 row-start-1 hidden flex-col items-start justify-between text-base md:flex">
            {leftCol && <LeftCol blocks={leftCol} />}
          </div>
          <header className="col-span-full md:hidden">
            {site && <MobileHeader {...site.mobile_menu} />}
          </header>
          <main className="col-span-full col-start-1 row-span-4 row-start-2 md:col-span-4 md:col-start-3 md:row-start-1">
            {children}
          </main>
          <div className="relative col-span-2 col-start-7 row-span-4 row-start-1 hidden grid-rows-2 justify-items-end md:grid">
            {<RightCol rightCol={rightCol} />}
          </div>
        </div>
      </div>
    </>
  );
}
