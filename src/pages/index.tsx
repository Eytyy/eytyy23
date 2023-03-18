import { GetStaticProps } from 'next';
import { lazy } from 'react';
import { PreviewSuspense } from 'next-sanity/preview';
import PageDisplay from '@/components/PageDisplay';
const PreviewIndexPage = lazy(
  () => import('@/components/previews/PreviewIndexPage')
);
import { getIndex, getSiteSettings } from '@/lib/sanity.client';
import { SiteProps, PageProps } from '@/types';

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

export default function FrontPage(props: Props) {
  const { page, site, preview, token } = props;

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PageDisplay loading preview page={page} site={site} />
        }
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    );
  }

  return <PageDisplay page={page} site={site} />;
}

export const getStaticProps: GetStaticProps<
  Props,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx;

  const [site = {}, page] = await Promise.all([
    getSiteSettings(),
    getIndex(),
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
