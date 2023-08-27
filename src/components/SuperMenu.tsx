import React from 'react';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { HiArrowNarrowDown } from 'react-icons/hi';

import useElementBounds from '@/hooks/useElementBounds';
import SketchBlock from './blocks/Sketch';
import { useHasMounted } from '@/hooks/useHasMounted';
import useThemeSwitch from '@/hooks/useThemeSwitch';
import {
  EpicGrid,
  EpicGridBottomLeft,
  EpicGridBottomRight,
  EpicGridMain,
  EpicGridTopLeft,
  EpicGridTopRight,
} from './UI';
import MainMenu from './navigation/MainMenu';
import FooterMenu from './navigation/FooterMenu';
import OtherNav from './navigation/OtherNav';
import { useApp } from '@/context/app';

export default function SuperMenu({
  pageTitle,
}: {
  pageTitle: string;
}) {
  const hasMounted = useHasMounted();
  const { isMenuOpen, toggleMenu } = useApp();
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = () => toggleMenu(false);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, toggleMenu]);

  return (
    <div>
      <button
        className="flex items-center gap-1 font-bold"
        onClick={() => toggleMenu(!isMenuOpen)}
      >
        <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }}>
          <HiArrowNarrowDown className="text-2xl" />
        </motion.div>

        {pageTitle}
      </button>
      {hasMounted &&
        createPortal(
          <AnimatePresence mode="wait">
            {isMenuOpen && (
              <Menu key={isMenuOpen ? 'portal-v' : 'portal-h'} />
            )}
          </AnimatePresence>,
          document.getElementById('portal')!
        )}
    </div>
  );
}

const variants: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.3 },
  },
  hidden: {
    y: '-100%',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

function Menu() {
  const { settings } = useApp();
  const { mainVisual, mainMenu, secondaryMenu, footerMenu } =
    settings;

  const { size, measuredRef } = useElementBounds();

  const theme = useThemeSwitch();

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 z-[50] w-full bg-pageBG text-pageText"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <EpicGrid className="pt-[var(--project-header-height)] lg:pt-[var(--project-header-height)]">
        <EpicGridTopLeft>
          <MainMenu menu={mainMenu} />
        </EpicGridTopLeft>
        <EpicGridBottomLeft className="h-full grid-rows-2 lg:grid">
          <OtherNav menu={secondaryMenu} />
        </EpicGridBottomLeft>
        <EpicGridMain ref={measuredRef}>
          {theme &&
            mainVisual &&
            mainVisual._type === 'sketchBlock' && (
              <SketchBlock
                {...mainVisual.sketch}
                width={size.width}
                height={size.height}
                canvasColor={theme.theme.name}
              />
            )}
        </EpicGridMain>
        <EpicGridTopRight>
          <div className="lg:hidden">
            <OtherNav top menu={secondaryMenu} />
          </div>
        </EpicGridTopRight>
        <EpicGridBottomRight>
          <FooterMenu menu={footerMenu} />
        </EpicGridBottomRight>
      </EpicGrid>
    </motion.div>
  );
}
