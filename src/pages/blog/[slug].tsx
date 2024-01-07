import { GetStaticProps } from 'next';
import {
  getAllBlogPostsSlugs,
  getBlogPostBySlug,
  getSiteSettings,
} from '@/lib/sanity.client';

import BlogPostDisplay, {
  type BlogPost,
} from '@/components/blog/Post';
import { SiteProps } from '@/types';
import BlogLayout from '@/components/blog/Layout';

type Props = {
  page: BlogPost;
  site: SiteProps;
};

type Query = {
  [key: string]: string;
};

export default function BlogPost(props: Props) {
  const { page } = props;
  return <BlogPostDisplay page={page} />;
}

export async function getStaticPaths() {
  const slugs = await getAllBlogPostsSlugs();
  return {
    paths: slugs?.map(({ slug }) => `/blog/${slug}`) || [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps<
  Props,
  Query
> = async (ctx) => {
  const { params = {} } = ctx;
  const [page, site] = await Promise.all([
    getBlogPostBySlug(params.slug),
    getSiteSettings(),
  ]);
  return {
    props: {
      page,
      site,
    },
  };
};

BlogPost.getLayout = function getLayout(page: any) {
  return <BlogLayout {...page.props}>{page}</BlogLayout>;
};
