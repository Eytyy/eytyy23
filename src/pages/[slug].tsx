import { lazy } from 'react';
import { PreviewSuspense } from 'next-sanity/preview';

import { getClient } from '@/lib/sanity.server';
import { pageFields, siteQuery } from '@/lib/queries';

import Page from '@/components/page';

const Preview = lazy(() => import('@/previews'));

interface Props {
  page: any;
  site: any;
  preview: boolean;
}

export default function ProductPage({ page, site, preview }: Props) {
  if (preview) {
    return (
      <PreviewSuspense fallback={<div>Loading</div>}>
        <Preview
          page="work"
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

export async function getStaticPaths() {
  // fetch all pages' slugs
  const paths = await getClient().fetch(
    `*[ _type == "page" && defined(slug) ].slug.current`
  );

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: { slug: string };
  preview: boolean;
}) {
  if (preview) return { props: { preview } };

  // fetch page by slug
  const pageQuery = `{
    "page": *[_type == "page" && slug.current == $slug ][0]{
      ${pageFields}
    },
    "site": ${siteQuery}
  }`;

  const data = await getClient(preview).fetch(pageQuery, {
    slug: params.slug,
  });

  return {
    props: {
      page: data.page,
      site: data.site,
    },
  };
}
