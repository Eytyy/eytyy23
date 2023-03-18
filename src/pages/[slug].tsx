import { lazy } from 'react';
import { GetStaticProps } from 'next';
import { PreviewSuspense } from 'next-sanity/preview';

import {
  getAllPageSlugs,
  getPageBySlug,
  getSiteSettings,
} from '@/lib/sanity.client';

import { PageProps, SiteProps } from '@/types';
import PageDisplay from '@/components/PageDisplay';
const PreviewPage = lazy(
  () => import('@/components/previews/PreviewPage')
);

interface Props {
  page: PageProps;
  site: SiteProps;
  preview: boolean;
  token: string | null;
}

interface Query {
  [key: string]: string;
}

interface PreviewData {
  token?: string;
}

export default function ProductPage(props: Props) {
  const { site, page, preview, token } = props;

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PageDisplay page={page} site={site} loading preview />
        }
      >
        <PreviewPage token={token} page={page} />
      </PreviewSuspense>
    );
  }

  return <PageDisplay page={page} site={site} />;
}

export async function getStaticPaths() {
  const slugs = await getAllPageSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps<
  Props,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx;

  const [site, page] = await Promise.all([
    getSiteSettings(),
    getPageBySlug(params.slug),
  ]);

  return {
    props: {
      page,
      site,
      preview,
      token: previewData.token ?? null,
    },
  };
};
