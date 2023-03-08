import { siteQuery } from '@/lib/queries';
import { getClient } from '@/lib/sanity.server';

import React from 'react';

type Props = {
  page: {
    title: string;
    _createdAt: string;
    _updatedAt: string;
  };
};

export default function BlogPost({ page }: Props) {
  return (
    <div>
      <h1 className="text-4xl">{page.title}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == 'blogPost' && defined(slug) && status != 'draft'][].slug.current`
  );
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getClient().fetch(
    `{
      "page": *[_type == 'blogPost' && slug.current == $slug][0],
      "site": ${siteQuery}
    }`,
    { slug: params.slug }
  );
  return { props: { page: data.page, site: data.site } };
}
