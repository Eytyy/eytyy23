import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Eytyy</title>
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
      <div className="min-h-screen bg-gray-100">{children}</div>
    </>
  );
}
