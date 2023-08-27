import PreviewProject from '@/components/previews/PreviewProject';
import ProjectContainer, {
  type ProjectProps,
} from '@/components/work/ProjectContainer';
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
      <PreviewSuspense
        fallback={
          <ProjectContainer page={page} site={site} loading preview />
        }
      >
        <PreviewProject token={token} page={page} site={site} />
      </PreviewSuspense>
    );
  }
  return <ProjectContainer key={page._id} page={page} site={site} />;
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
