import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import '@/styles/app.css';

import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProvider } from '@/context/app';
import PlausibleProvider from 'next-plausible';
import Head from 'next/head';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const inter = Inter({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-inter',
});

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <PlausibleProvider domain="eytyy.com">
      <Head>
        <title>Eyas Tayyem</title>
        <meta
          name="description"
          content="Freelance creative coder and consultant."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppProvider site={pageProps.site}>
        <div className={`${inter.variable} font-sans`}>
          <div id="portal"></div>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </AppProvider>
    </PlausibleProvider>
  );
}
