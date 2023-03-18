import { createClient } from 'next-sanity';

import {
  apiVersion,
  dataset,
  projectId,
  useCdn,
} from '@/lib/sanity.api';
import {
  indexQuery,
  siteQuery,
  filtersQuery,
  blogQuery,
  blogPostSlugsQuery,
  pageSlugsQuery,
  pageQuery,
  blogPostQuery,
} from './queries';
import { type SiteProps, type PageProps } from '@/types';
import { FilterGroup } from '@/components/filters';
import { BlogPost } from '@/components/blog/Post';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

export async function getIndex(): Promise<PageProps> {
  return await client.fetch(indexQuery);
}

export async function getSiteSettings(): Promise<SiteProps> {
  return (await client.fetch(siteQuery)) || {};
}

export async function getBlog(): Promise<PageProps> {
  return await client.fetch(blogQuery);
}

export async function getFilters(): Promise<FilterGroup[]> {
  return (await client.fetch(filtersQuery)) || [];
}

export async function getAllBlogPostsSlugs(): Promise<
  Pick<BlogPost, 'slug'>[]
> {
  const slugs =
    (await client.fetch<string[]>(blogPostSlugsQuery)) || [];
  return slugs.map((slug) => ({ slug }));
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost> {
  return await client.fetch(blogPostQuery, { slug });
}

export async function getAllPageSlugs(): Promise<
  Pick<PageProps, 'slug'>[]
> {
  const slugs = (await client.fetch<string[]>(pageSlugsQuery)) || [];
  return slugs.map((slug) => ({ slug }));
}

export async function getPageBySlug(
  slug: string
): Promise<PageProps> {
  return await client.fetch(pageQuery, { slug });
}
