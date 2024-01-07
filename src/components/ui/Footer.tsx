import React from 'react';
import { HiArrowNarrowUp } from 'react-icons/hi';

import AnimatedTitle from '@/components/AnimatedTitle';
import { motion, useInView } from 'framer-motion';
import { useApp } from '@/context/app';
import { SiteProps } from '@/types';
import useMenu from '@/components/navigation/useMenu';
import Wrapper from './Wrapper';
import Logos from '../Logos';
import { MainMenu } from '../navigation';
import { footerMenuItemVariant } from '../navigation/animation';
import { BlogNavItem, NavItem, PageLink } from '../navigation/NavItem';

type Props = {
  title: string;
  menus: SiteProps['menus'];
};

export default function Footer({ title, menus }: Props) {
  const { footerVisible, setFooterVisible } = useApp();
  const { menuItems } = useMenu({menus})

  const ref = React.useRef(null);
  const inView = useInView(ref);

  const scrollToTop = () => {
    if (!window) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (inView && !footerVisible) {
      setFooterVisible(true);
    } else if (!inView && footerVisible) {
      setFooterVisible(false);
    }
  }, [inView, footerVisible, setFooterVisible]);

  return (
    <footer className="min-h-[var(--app-height)] w-full" ref={ref}>
      <Wrapper>
        <div className="sticky top-0 z-10 flex items-start justify-between bg-[#fff] pt-10 lg:pt-16">
          <button onClick={scrollToTop} className="flex items-end">
            <HiArrowNarrowUp className="text-[max(3.125rem,8vw)] 2xl:text-[max(3.125rem,7vw)]" />
            <div className="flex flex-col gap-4">
              <MainMenu />
              <AnimatedTitle title={title} className="line-through" />
            </div>
          </button>
          <Logos />
        </div>
        {menuItems.map((item) => (
          <Item item={item} key={item._id} />
        ))}
      </Wrapper>
    </footer>
  );
}


export function Item({ item }: { item: any }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const [complete, setComplete] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      variants={footerMenuItemVariant}
      animate={inView ? 'visible' : 'hidden'}
      key={item._id}
      onAnimationComplete={() => setComplete(true)}
    >
      {
        item._type === 'navBlog' ? (
          <BlogNavItem item={item} animate={complete} />
        ) : (
          <PageLink item={item}>
            <AnimatedTitle
              title={item.title}
              animate={complete}
              className="hover:underline"
            />
          </PageLink>)
      }
    </motion.div>
  );
}
