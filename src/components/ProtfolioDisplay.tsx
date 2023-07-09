import React, { useCallback, useEffect, useMemo } from 'react';
import { PortfolioProps, SiteProps } from '@/types';

import PortfolioSection from './PortfolioSection';
import LeftCol from './LeftCol';
import RightCol from './RightCol';
import ContentBlock from './blocks/Content';
import Link from 'next/link';
import Logo from './Logo';
import ToggleButton from './Toggle';

type Props = {
  page: PortfolioProps;
  site: SiteProps;
  preview?: boolean;
  loading?: boolean;
};

import useThemeSwitch, { themes_names } from '@/hooks/useThemeSwitch';
type Themes = (typeof themes_names)[number] | undefined;

export default function PortfolioDisplay(props: Props) {
  const { page } = props;
  const [activeSectionIdx, setActiveSectionIdx] = React.useState(0);
  const { sections } = page;
  const activeSection = useMemo(
    () => sections[activeSectionIdx],
    [activeSectionIdx, sections]
  );

  const theme = useThemeSwitch();

  const LoadNext = useCallback(() => {
    if (activeSectionIdx !== sections.length - 1) {
      setActiveSectionIdx((prev) => prev + 1);
    } else {
      setActiveSectionIdx(0);
    }
  }, [setActiveSectionIdx, activeSectionIdx, sections]);

  const [showText, setShowText] = React.useState(false);

  useEffect(() => {
    if (theme) {
      theme.setTheme(sections[activeSectionIdx].theme);
    }
  }, [theme, sections, activeSectionIdx]);
  return (
    <>
      <div className="bg-pageBG transition-colors duration-300 ease-linear">
        <div className="grid min-h-app grid-cols-8 grid-rows-home-m p-8 text-pageText md:grid-rows-home md:p-14">
          <div className="relative col-span-2 col-start-1 row-span-4 row-start-1 hidden flex-col items-start justify-between text-base md:flex">
            <div className="sticky top-14 font-bold">
              {activeSection.title}
            </div>
          </div>
          <header className="col-span-full md:hidden"></header>
          <main className="col-span-full col-start-1 row-span-4 row-start-2 md:col-span-4 md:col-start-3 md:row-start-1">
            <div className="section relative h-full overflow-hidden">
              <PortfolioSection
                textVisible={showText}
                key={activeSection._key}
                section={activeSection}
                onEnd={LoadNext}
              />
            </div>
          </main>
          <div className="relative col-span-2 col-start-7 row-span-4 row-start-1 hidden grid-rows-2 justify-items-end md:grid">
            <Link className="sticky top-14" href="/">
              <Logo />
            </Link>
            <div className="sticky bottom-14 self-end">
              <ToggleButton
                onToggle={() => setShowText((prev) => !prev)}
                value={showText ? 'on' : 'off'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
