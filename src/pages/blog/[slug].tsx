import BlogPostDisplay from '@/components/blog/Post';
import { FilterProps } from '@/components/filters';
import { siteQuery } from '@/lib/queries';
import { getClient } from '@/lib/sanity.server';
import { Block } from '@/types';

import React from 'react';

type Props = {
  page: {
    title: string;
    _createdAt: string;
    _updatedAt: string;
    tags: FilterProps[];
    slug: string;
    blocks: Block[];
    summary: any;
  };
};

export default function BlogPost({ page }: Props) {
  return <BlogPostDisplay {...page} />;
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
