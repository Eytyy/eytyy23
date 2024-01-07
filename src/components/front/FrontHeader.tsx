
import {
  motion,
} from 'framer-motion';

import { cn } from '@/lib/utils';

import AnimatedTitle from '@/components/AnimatedTitle';
import { HeaderMenu, MainMenu } from '@/components/navigation';
import Logos from '@/components/Logos';
import Container from '@/components/ui/Container';
import ArrowDown from '@/components/navigation/ArrowDown';
import Wrapper from '@/components/ui/Wrapper';
import useHeader from '@/components/navigation/useHeader';
import { NavItem } from '@/components/navigation/NavItem';
import useMenu from '../navigation/useMenu';
import { SiteProps } from '@/types';
import BlogLink from '../navigation/BlogLink';

type Props = {
  theme: 'white' | 'black' | 'blue';
  front?: boolean;
  menus: SiteProps['menus'];
};

function getMenuTitle(menu: string) {
  switch (menu) {
    case 'work':
      return 'Selected Work';
    case 'blog':
      return 'Latest Posts';
    case 'contact':
      return 'aqsdlkas;d';
    default:
      return 'Menu';
  }
}

export default function FrontHeader({  theme , front, menus}: Props) {
  const { menuItems, activeMenu, updateActiveMenu } = useMenu({menus})
  const { isMenuOpen, ref, toggleMenu } = useHeader()
  const title = isMenuOpen && activeMenu ? getMenuTitle(activeMenu) : 'Menu'

  return (
    <motion.div ref={ref} className='fixed top-0 left-0 z-50 w-full'>
      <Container theme={theme} className='bg-transparent'>
        <Wrapper className="pt-10 lg:pt-16">
          <div className="flex items-start justify-between">
            <div className="flex items-end">
              <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }}>
                <button onClick={() => toggleMenu(!isMenuOpen)}>
                  <ArrowDown />
                </button>
              </motion.div>
              <div className='space-y-2'>
                <MainMenu front={front}  onClick={(slug: string) => {
                  updateActiveMenu(slug)
                    if(!isMenuOpen) toggleMenu(true)
                  }}
                  activeMenu={isMenuOpen ? activeMenu : undefined}
                />
                <button onClick={() => toggleMenu(!isMenuOpen)}>
                  <AnimatedTitle key={`${isMenuOpen ? 'open' : 'closed'}-${activeMenu}-title`} title={title} className={cn(isMenuOpen && 'line-through')} />
                </button>
              </div>
            </div>
            {isMenuOpen && (
              <HeaderMenu className={cn(
                  front && 'bg-transparent',
                  front ? theme === 'black' || 'blue' ? 'text-white' : 'text-black' : null
              )}>
                { menuItems.map((item) => (<NavItem item={item} key={item._id} />)) }
                {activeMenu === 'blog' && <BlogLink />}
              </HeaderMenu>
            )}
            <Logos />
          </div>
        </Wrapper>
      </Container>
    </motion.div>
  );
}

