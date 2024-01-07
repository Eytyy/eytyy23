import React from 'react';
import { Blog } from '@/components/blog';
import {
  getBlog,
  getFilters,
  getSiteSettings,
} from '@/lib/sanity.client';
import { PageProps, SiteProps } from '@/types';
import { GetStaticProps } from 'next';
import { FilterGroup } from '@/components/blog/Filters';

interface Props {
  page: PageProps;
  site: SiteProps;
  filterGroups: FilterGroup[];
}


export default function BlogPage({
  page,
  site,
  filterGroups,
}: Props) {

  return <Blog page={page} site={site} filterGroups={filterGroups} />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [site, page, filterGroups] = await Promise.all([
    getSiteSettings(),
    getBlog(),
    getFilters(),
  ]);
  return {
    props: {
      filterGroups,
      page,
      site,
    },
  };
};
