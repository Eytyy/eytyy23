import { Menu, NavPage } from '@/components/navigation/types';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function useMainNav(menu: Menu) {
  const { query } = useRouter();
  const slug = query.slug as string;

  const { other, pageLinks, activePageIdx, nextPage } =
    useMemo(() => {
      // Get the page links from the main menu
      const pageLinks = menu?.items.filter(
        (item) => item._type === 'navPage'
      ) as NavPage[] | undefined;

      // Get the index of the active page
      const activePageIdx = pageLinks?.findIndex(
        (link) => link.page?.slug === slug
      );

      // Get the next page
      const nextPage =
        pageLinks && activePageIdx
          ? pageLinks.length > activePageIdx
            ? pageLinks[activePageIdx + 1]
            : pageLinks[0]
          : undefined;

      const other = pageLinks?.filter(
        (link) => link.page?.slug !== slug
      );

      return {
        activePageIdx,
        pageLinks,
        nextPage,
        other,
      };
    }, [menu, slug]);

  return {
    activePageIdx,
    nextPage,
    pageLinks,
    other,
  };
}
