import Link from 'next/link';
import { motion } from 'framer-motion';
import { NavLink, NavPage, NavStatic } from '@/types';
import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import random from 'canvas-sketch-util/random';

export type Props = NavPage | NavLink | NavStatic;

export default function PageBlock({ _type, ...props }: Props) {
  if (_type === 'navPage') {
    return <PageLink {...(props as NavPage)} />;
  }
  if (_type === 'navStatic') {
    return <StaticLink {...(props as NavStatic)} />;
  }
  if (_type === 'navLink') {
    return <ExternalLink {...(props as NavLink)} />;
  }
  return (
    <div>
      {'😞'.split('').map((c) => (
        <PC key={`${props._key}-${c}`} c={c} />
      ))}
    </div>
  );
}

function PageLink({ _key, title, page }: Omit<NavPage, '_type'>) {
  return (
    <motion.span
      whileTap={{ scale: 4 }}
      whileHover={{ scale: 1.2 }}
      style={{
        gridColumn: `span ${title.length} / span ${title.length}`,
      }}
    >
      {page._type === 'project' && page.format === 'link' ? (
        <a
          target="_blank"
          className="bg-white font-bold text-[black]"
          href={page.link}
          rel="noreferrer"
        >
          {title.split('').map((c, i) => (
            <PC key={`${_key}-${c}-${i}`} c={c} />
          ))}
        </a>
      ) : (
        <Link
          className="bg-white font-bold text-[black]"
          href={page.slug === 'home' ? '/' : page.slug}
        >
          {title.split('').map((c, i) => (
            <PC key={`${_key}-${c}-${i}`} c={c} />
          ))}
        </Link>
      )}
    </motion.span>
  );
}

function StaticLink({
  _key,
  title,
  slug,
}: {
  title: string;
  slug: string;
  _key: string;
}) {
  return (
    <motion.span
      whileTap={{ scale: 4 }}
      whileHover={{ scale: 1.2 }}
      style={{
        gridColumn: `span ${title.length} / span ${title.length}`,
      }}
    >
      <Link className="bg-white font-bold text-[black]" href={slug}>
        {title.split('').map((c, i) => (
          <PC key={`${_key}-${c}-${i}`} c={c} />
        ))}
      </Link>
    </motion.span>
  );
}

function ExternalLink({
  _key,
  title,
  link,
}: {
  _key: string;
  title: string;
  link: string;
}) {
  console.log(title, link);
  if (!link) return null;
  return (
    <motion.a
      whileTap={{ scale: 4 }}
      whileHover={{ scale: 1.2 }}
      style={{
        gridColumn: `span ${title.length} / span ${title.length}`,
      }}
      target={!link.match('^mailto:|^tel:') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="bg-white font-bold text-[black]"
      href={link}
    >
      {title.split('').map((c, i) => (
        <PC key={`${_key}-${c}-${i}`} c={c} />
      ))}
    </motion.a>
  );
}

function PC({ c }: { c: string }) {
  const [visible, setVisible] = useState(false);
  const to = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    to.current = setTimeout(
      () => setVisible(true),
      random.range(200, 2000)
    );
    return () => {
      if (to.current) clearTimeout(to.current);
    };
  }, []);

  return <span style={{ opacity: visible ? 1 : 0 }}>{c}</span>;
}
