import { GetStaticProps } from 'next';

import {
  getAllPageSlugs,
  getPageBySlug,
  getSiteSettings,
} from '@/lib/sanity.client';

import { PageProps, SiteProps } from '@/types';
import PageDisplay from '@/components/PageDisplay';

interface Props {
  page: PageProps;
  site: SiteProps;
}

interface Query {
  [key: string]: string;
}

export default function Page(props: Props) {
  const { site, page } = props;


  return <PageDisplay page={page} site={site} />;
}

export async function getStaticPaths() {
  const slugs = await getAllPageSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps<
  Props,
  Query
> = async (ctx) => {
  const { params = {} } = ctx;

  const [site, page] = await Promise.all([
    getSiteSettings(),
    getPageBySlug(params.slug),
  ]);

  return {
    props: {
      page,
      site,
    },
  };
};
