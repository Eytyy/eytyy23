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
  sketchQuery,
  sketchSlugsQuery,
  projectQuery,
  allProjectsSlugQuery,
} from './queries';
import { type SiteProps, type PageProps } from '@/types';
import { BlogPost } from '@/components/blog/Post';
import { SketchProps } from '@/components/sketch';
import { FilterGroup } from '@/components/blog/Filters';
import { ProjectProps } from '@/components/work/ProjectDisplay';
import { FrontProps } from '@/components/front/Frontdisplay';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

export async function getIndex(): Promise<FrontProps> {
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

// all slugs
export async function getAllProjectsSlugs(): Promise<
  Pick<ProjectProps, 'slug'>[]
> {
  const slugs =
    (await client.fetch<string[]>(allProjectsSlugQuery)) || [];
  return slugs.map((slug) => ({ slug }));
}

export async function getAllBlogPostsSlugs(): Promise<
  Pick<BlogPost, 'slug'>[]
> {
  const slugs =
    (await client.fetch<string[]>(blogPostSlugsQuery)) || [];
  return slugs.map((slug) => ({ slug }));
}

export async function getAllPageSlugs(): Promise<
  Pick<PageProps, 'slug'>[]
> {
  const slugs = (await client.fetch<string[]>(pageSlugsQuery)) || [];
  return slugs.map((slug) => ({ slug }));
}

export async function getAllSketchSlugs(): Promise<
  Pick<SketchProps, 'slug'>[]
> {
  const slugs =
    (await client.fetch<string[]>(sketchSlugsQuery)) || [];
  return slugs.map((slug) => ({ slug }));
}

// page by slug
export async function getProjectBySlug(
  slug: string
): Promise<ProjectProps> {
  return await client.fetch(projectQuery, { slug });
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost> {
  return await client.fetch(blogPostQuery, { slug });
}

export async function getPageBySlug(
  slug: string
): Promise<PageProps> {
  return await client.fetch(pageQuery, { slug });
}

export async function getSketchBySlug(
  slug: string
): Promise<SketchProps> {
  return await client.fetch(sketchQuery, { slug });
}
