import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import SketchNavigation from '../sketches/navigation';
import { motion } from 'framer-motion';
type Props = {
  children: ReactNode;
};

export default function SketchLayout({ children }: Props) {
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
      <motion.div
        className="absolute top-0 left-0 z-10 text-4xl text-white mix-blend-difference md:text-9xl"
        whileTap={{ scale: 0.9 }}
      >
        <Link href="/">&larr;</Link>
      </motion.div>
      <div className=" min-h-screen bg-gray-100">{children}</div>
      <SketchNavigation />
    </>
  );
}
