import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { SiteProps } from '@/types';

function getMenuName(slug: string) {
  switch (slug) {
    case 'projects':
      return 'work'
    case 'blog':
      return 'blog'
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
  const menu = menus[activeMenu];
  const menuItems = menu.items.filter((item) => {
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