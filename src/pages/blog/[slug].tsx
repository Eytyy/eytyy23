import { GetStaticProps } from 'next';
import { PreviewSuspense } from 'next-sanity/preview';
import { lazy } from 'react';
import {
  getAllBlogPostsSlugs,
  getBlogPostBySlug,
  getSiteSettings,
} from '@/lib/sanity.client';

import BlogPostDisplay, {
  type BlogPost,
} from '@/components/blog/Post';
import { SiteProps } from '@/types';
const PreviewBlogPost = lazy(
  () => import('@/components/previews/PreviewBlogPost')
);

type Props = {
  page: BlogPost;
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

export default function BlogPost(props: Props) {
  const { page, preview, token } = props;
  if (preview) {
    return (
      <PreviewSuspense
        fallback={<BlogPostDisplay page={page} loading preview />}
      >
        <PreviewBlogPost token={token} page={page} />
      </PreviewSuspense>
    );
  }
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
  Query,
  Previewdata
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx;
  const [page, site] = await Promise.all([
    getBlogPostBySlug(params.slug),
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
