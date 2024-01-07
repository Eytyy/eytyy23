import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { SiteProps } from '@/types';

function getMenuName(slug: string) {
  switch (slug) {
    case 'projects':
      return 'work'
    case 'blog':
      return 'blog'
    case 'contact':
      return 'contact'
    default:
      return 'work'
  }
}
export default function useMenu({ menus }: {
  menus: SiteProps['menus']
}) {
  const { asPath, pathname } = useRouter();
  const name = pathname.split('/')[1]

  const [activeMenu, setActiveMenu] = useState<ReturnType<typeof getMenuName>>(getMenuName(name));
  // active name should equal the key of SiteProps['menus'] object otherwise undefined
  // menus is an object
  const menu = activeMenu ? menus[activeMenu] : undefined

  const menuItems = typeof menu === 'undefined' ? [] : menu.items.filter((item) => {
    const isPage = item._type === 'navPage' || item._type === 'navBlog';
    const isNotCurrentPage = isPage && item.slug !== asPath;
    const isLink = item._type === 'navLink';
    return isNotCurrentPage || isLink
  });
  const updateActiveMenu = useCallback((slug: string) => {
    setActiveMenu(getMenuName(slug))
  }, [])

  return {  menuItems, activeMenu, updateActiveMenu }
}