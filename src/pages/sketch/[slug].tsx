import Sketch, { SketchProps } from '@/components/sketch';
import { useCallback, useEffect, useState } from 'react';
import {
  getAllSketchSlugs,
  getSiteSettings,
  getSketchBySlug,
} from '@/lib/sanity.client';
import { GetStaticProps } from 'next';
import { SiteProps } from '@/types';

type Props = {
  page: SketchProps;
  site: SiteProps;
};

type Query = {
  [key: string]: string;
};

export default function SketchPage({ page }: Props) {
  return <Sketch {...page} />;
}

export async function getStaticPaths() {
  const slugs = await getAllSketchSlugs();
  return {
    paths: slugs.map(({ slug }) => `/sketch/${slug}`),
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps<Props, Query> = async (
  ctx
) => {
  const { params = {} } = ctx;

  const [site, page] = await Promise.all([
    getSiteSettings(),
    getSketchBySlug(params.slug),
  ]);
  return { props: { page, site } };
};

SketchPage.getLayout = function getLayout(page: any) {
  return page;
};
