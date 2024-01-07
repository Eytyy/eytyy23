import ProjectDisplay, {
  type ProjectProps,
} from '@/components/work/ProjectDisplay';
import {
  getAllProjectsSlugs,
  getProjectBySlug,
  getSiteSettings,
} from '@/lib/sanity.client';
import { SiteProps } from '@/types';
import { GetStaticProps } from 'next';
import React from 'react';

type Props = {
  page: ProjectProps;
  site: SiteProps;
};

type Query = {
  [key: string]: string;
};

export default function Project(props: Props) {
  const { page, site } = props;

  return <ProjectDisplay key={page._id} page={page} site={site} />;
}

export async function getStaticPaths() {
  const slugs = await getAllProjectsSlugs();
  return {
    paths: slugs?.map(({ slug }) => `/projects/${slug}`),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  Props,
  Query
> = async (ctx) => {
  const { params = {} } = ctx;
  const [page, site] = await Promise.all([
    getProjectBySlug(params.slug),
    getSiteSettings(),
  ]);
  return {
    props: {
      page,
      site,
    },
  };
};
