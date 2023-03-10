import React, { lazy } from 'react';
import { PreviewSuspense } from 'next-sanity/preview';

import { getClient } from '@/lib/sanity.server';
import { pageFields, siteQuery } from '@/lib/queries';

import { Blog } from '@/components/blog';
import BlogLayout from '@/components/blog/Layout';

const Preview = lazy(() => import('@/previews'));

type Props = {
  page: any;
  site: any;
  preview: boolean;
};

export default function BlogPage({ page, site, preview }: Props) {
  if (preview) {
    return (
      <PreviewSuspense fallback={<div>Loading</div>}>
        <Preview
          page="blog"
          render={({ page, site }) => (
            <Blog page={page} site={site} />
          )}
        />
      </PreviewSuspense>
    );
  }
  if (!page) return <div>🤔</div>;

  return <Blog page={page} site={site} />;
}

export async function getStaticProps({ preview = false }) {
  if (preview) return { props: { preview } };

  const homeQuery = `{
    "page": *[ _type == "page" && _id == *[_type=="generalSettings"][0].blog->_id ][0] {
      ${pageFields},
      "filterGroups": [{
        "name": 'tags',
        "filters": *[
          _type == 'tag' &&
          slug.current in array::unique(
            *[
              _type == 'blogPost'
              && defined(slug)
              && status != 'draft'
            ][].tags[]->.slug.current
          )
        ] | order(title asc) {
          _id,
          title,
          "slug": slug.current
        }
      }]
    },
    "site": ${siteQuery},

  }`;
  const data = await getClient(preview).fetch(homeQuery);

  return {
    props: {
      page: data.page,
      site: data.site,
    },
  };
}

BlogPage.getLayout = function getLayout(page: any) {
  return <BlogLayout {...page.props}>{page}</BlogLayout>;
};
