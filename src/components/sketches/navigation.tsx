import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { TbRefresh } from 'react-icons/tb';

const navVariants = {
  visible: {
    opacity: 1,
    display: 'flex',
  },
  hidden: {
    opacity: 0,
    display: 'none',
  },
};

const toggleVariants = {
  visible: {
    rotate: -90,
  },
  hidden: {
    rotate: 90,
  },
};
export default function SketchNavigation() {
  const { events, query } = useRouter();
  const activeID = query.slug as string;

  const links = sketchesData.filter(
    (sketch) => sketch.slug !== activeID
  );
  const [visible, setVisible] = useState(false);

  function toggleMenu() {
    setVisible((v) => !v);
  }

  const closeMenu = useCallback(() => setVisible(false), []);

  useEffect(() => {
    events.on('routeChangeStart', closeMenu);
    return () => events.off('routeChangeStart', closeMenu);
  }, [events, closeMenu]);

  const router = useRouter();

  return (
    <nav className="fixed top-0 right-0 z-10 h-screen overflow-x-scroll text-4xl text-white mix-blend-difference md:text-9xl">
      <motion.div className="sticky top-0 z-10 flex cursor-pointer gap-4">
        <motion.div
          whileTap={{
            rotate: 180,
            scale: 0.9,
            transition: {
              rotate: {
                duration: 2,
                repeat: Infinity,
              },
            },
          }}
        >
          <TbRefresh onClick={() => router.reload()} />
        </motion.div>
        <motion.div
          className="flex gap-2"
          whileTap={{
            scale: 0.9,
          }}
          onClick={toggleMenu}
        >
          <motion.div
            variants={toggleVariants}
            animate={visible ? 'visible' : 'hidden'}
            initial={{ rotate: 90 }}
          >
            &rarr;
          </motion.div>
          <div className="font-mono">{activeID}</div>
        </motion.div>
      </motion.div>
      <motion.div
        variants={navVariants}
        animate={visible ? 'visible' : 'hidden'}
        className="flex flex-col items-end gap-2 font-mono"
      >
        {links.map((link) => (
          <Link href={`/sketches/${link.slug}`} key={link.slug}>
            {link.title}
          </Link>
        ))}
      </motion.div>
    </nav>
  );
}

export const sketchesData = [
  {
    title: '0001',
    slug: '0001',
  },
  {
    title: '0002',
    slug: '0002',
  },
  {
    title: '0003',
    slug: '0003',
  },
  {
    title: '0004',
    slug: '0004',
  },
  {
    title: '0005',
    slug: '0005',
  },
  {
    title: '0006',
    slug: '0006',
  },
  {
    title: '0007',
    slug: '0007',
  },
  {
    title: '0008',
    slug: '0008',
  },
  {
    title: '0009',
    slug: '0009',
  },
  {
    title: '0010',
    slug: '0010',
  },
  {
    title: '0011',
    slug: '0011',
  },
  {
    title: '0012',
    slug: '0012',
  },
  {
    title: '0013',
    slug: '0013',
  },
  {
    title: '0014',
    slug: '0014',
  },
  {
    title: '0015',
    slug: '0015',
  },
  {
    title: '0016',
    slug: '0016',
  },
  {
    title: '0017',
    slug: '0017',
  },
];
