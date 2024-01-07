import { GetStaticProps } from 'next';
import { lazy } from 'react';
import { PreviewSuspense } from 'next-sanity/preview';
const PreviewIndexPage = lazy(
  () => import('@/components/previews/PreviewIndexPage')
);
import { getIndex, getSiteSettings } from '@/lib/sanity.client';
import { SiteProps, PageProps } from '@/types';
import FrontDisplay, { FrontProps } from '@/components/front/Frontdisplay';

interface Props {
  page: FrontProps;
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
          <FrontDisplay loading preview page={page} site={site} />
        }
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    );
  }

  return <FrontDisplay page={page} site={site} />;
}

export const getStaticProps: GetStaticProps<
  Props,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx;

  const [site, page] = await Promise.all([
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

FrontPage.getLayout = function getLayout(page: React.ReactElement) {
  return <>{page}</>;
};
