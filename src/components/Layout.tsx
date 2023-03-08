import Head from 'next/head';
import React, { ReactNode } from 'react';
import ColumnBlock from '@/blocks/Column';
import LeftCol from './LeftCol';
import RightCol from './RightCol';

type Props = {
  children: ReactNode;
  page: any;
};

export default function Layout({ children, page }: Props) {
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
      <div className="bg-pageBG">
        <div className="grid min-h-screen grid-cols-8 grid-rows-home gap-11 p-14 text-pageText">
          <div className="relative col-span-2 col-start-1 row-span-4 row-start-1 flex flex-col items-start justify-between">
            {leftCol && <LeftCol blocks={leftCol} />}
          </div>
          <main className="col-span-4 col-start-3 row-span-3 row-start-1">
            {children}
          </main>
          <div className="relative col-span-2 col-start-7 row-span-3 row-start-1 grid grid-rows-2 justify-items-end">
            {<RightCol rightCol={rightCol} />}
          </div>
          <footer className="relative col-span-3 col-start-6 row-start-4">
            {footer && <ColumnBlock block={footer} />}
          </footer>
        </div>
      </div>
    </>
  );
}
