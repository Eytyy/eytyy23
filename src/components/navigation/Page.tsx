import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { NavPage } from './types';

export default function PageLink({ title, page }: NavPage) {
  return (
    <motion.span>
      <Link
        className="bg-white font-bold text-[black]"
        href={page.slug === 'home' ? '/' : page.slug}
      >
        {title}
      </Link>
    </motion.span>
  );
}
