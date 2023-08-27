import React, { lazy } from 'react';
import { PreviewSuspense } from 'next-sanity/preview';

import { Blog } from '@/components/blog';
import {
  getBlog,
  getFilters,
  getSiteSettings,
} from '@/lib/sanity.client';
import { PageProps, SiteProps } from '@/types';
import { GetStaticProps } from 'next';
import { FilterGroup } from '@/components/blog/Filters';

const PreviewIndexPage = lazy(
  () => import('@/components/previews/PreviewBlogPage')
);

interface Props {
  page: PageProps;
  site: SiteProps;
  filterGroups: FilterGroup[];
  preview: boolean;
  token: string | null;
}

interface Query {
  [key: string]: string;
}

interface PreviewData {
  token?: string;
}

export default function BlogPage({
  page,
  site,
  filterGroups,
  preview,
  token,
}: Props) {
  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <Blog
            loading
            preview
            page={page}
            site={site}
            filterGroups={filterGroups}
          />
        }
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    );
  }

  return <Blog page={page} site={site} filterGroups={filterGroups} />;
}

export const getStaticProps: GetStaticProps<
  Props,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx;
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
      preview,
      token: previewData.token ?? null,
    },
  };
};
