import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/app.css';

import Layout from '@/components/Layout';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { ThemeProvider } from 'next-themes';
import { themes_names } from '@/hooks/useThemeSwitch';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => <Layout {...pageProps}>{page}</Layout>);

  return (
    <ThemeProvider
      themes={themes_names}
      defaultTheme="black"
      enableSystem={false}
      disableTransitionOnChange
    >
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}
