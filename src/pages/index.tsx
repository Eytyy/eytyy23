import { lazy } from 'react';
import { PreviewSuspense } from 'next-sanity/preview';

import { getClient } from '@/lib/sanity.server';
import { pageFields, siteQuery } from '@/lib/queries';
import Page from '@/components/page';

const Preview = lazy(() => import('@/previews'));

type Props = {
  page: any;
  site: any;
  preview: boolean;
};

export default function FrontPage({ page, site, preview }: Props) {
  if (preview) {
    return (
      <PreviewSuspense fallback={<div>Loading</div>}>
        <Preview
          page="home"
          render={({ page, site }) => (
            <Page page={page} site={site} />
          )}
        />
      </PreviewSuspense>
    );
  }
  if (!page) return <div>🤔</div>;

  return <Page page={page} site={site} />;
}

export async function getStaticProps({ preview = false }) {
  if (preview) return { props: { preview } };

  const homeQuery = `{
    "page": *[ _type == "page" && _id == *[_type=="generalSettings"][0].home->_id ][0] {
      ${pageFields}
    },
    "site": ${siteQuery}
  }`;
  const data = await getClient(preview).fetch(homeQuery);

  return {
    props: {
      page: data.page,
      site: data.site,
    },
  };
}
