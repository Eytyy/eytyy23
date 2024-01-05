import PreviewProject from '@/components/previews/PreviewProject';
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
import { PreviewSuspense } from 'next-sanity/preview';
import React from 'react';

type Props = {
  page: ProjectProps;
  site: SiteProps;
  preview: boolean;
  token: string | null;
};

type Query = {
  [key: string]: string;
};

type Previewdata = {
  token?: string;
};

export default function Project(props: Props) {
  const { page, preview, token, site } = props;
  if (preview) {
    return (
      <PreviewSuspense fallback={<ProjectDisplay page={page} />}>
        <PreviewProject token={token} page={page} site={site} />
      </PreviewSuspense>
    );
  }
  return <ProjectDisplay key={page._id} page={page} />;
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
  Query,
  Previewdata
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx;
  const [page, site] = await Promise.all([
    getProjectBySlug(params.slug),
    getSiteSettings(),
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
