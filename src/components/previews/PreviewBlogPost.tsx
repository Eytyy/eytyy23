import { blogPostQuery } from '@/lib/queries';
import { usePreview } from '@/lib/sanity.preview';
import React from 'react';
import BlogPostDisplay, { BlogPost } from '../blog/Post';

type Props = {
  page: BlogPost;
  token: null | string;
};

export default function PreviewBlogPost({ page, token }: Props) {
  const post = usePreview(token, blogPostQuery, { slug: page.slug });
  return <BlogPostDisplay {...post} />;
}
