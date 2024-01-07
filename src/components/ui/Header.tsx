
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
import { SiteProps } from '@/types';
import useMenu from '@/components/navigation/useMenu';
import { NavItem } from '@/components/navigation/NavItem';
import { FaStarOfLife } from 'react-icons/fa';

type Props = {
  title: string;
  menus: SiteProps['menus']
};


export default function Header({ title, menus }: Props) {
  const { menuItems, activeMenu, updateActiveMenu } = useMenu({ menus })
  const { isMenuOpen, visible, footerVisible, y, ref, toggleMenu } = useHeader()
  const showHeader = visible && !footerVisible;
  const onClick = () => {
    if (menuItems.length === 0) return
    toggleMenu(!isMenuOpen)
  }
  return (
    <motion.header
      ref={ref}
      className={cn(
        'fixed top-0 left-0 z-50 w-full',
        showHeader && 'duration-350 transition-transform ease-in',
      )}
      style={{ y: showHeader ? 0 : y }}
    >
      <Container theme="white" className={cn(!showHeader && 'bg-transparent')}>
        <Wrapper className="pt-10 lg:pt-16">
          <div className="flex items-start justify-between">
            <div className="flex items-end">
              <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }}>
                <button onClick={onClick}>
                  { menuItems.length > 0 ? <ArrowDown /> : <FaStarOfLife className="animate-spin shrink-0 text-[max(3.125rem,8vw)]  2xl:text-[max(3.125rem,7vw)]" />}
                </button>
              </motion.div>
              <div className='space-y-2'>
                <MainMenu onClick={(slug: string) => {
                  updateActiveMenu(slug)
                  if(!isMenuOpen) toggleMenu(true)
                }} activeMenu={activeMenu} />
                <button onClick={onClick}>
                  <AnimatedTitle key={`${activeMenu}-title`} title={title} className={cn(isMenuOpen && 'line-through')} />
                </button>
              </div>
            </div>
            {isMenuOpen && (
              <HeaderMenu>
                { menuItems.map((item) => (<NavItem item={item} key={item._id} />)) }
              </HeaderMenu>
            )}
            <Logos />
          </div>
        </Wrapper>
      </Container>
    </motion.header>
  );
}
