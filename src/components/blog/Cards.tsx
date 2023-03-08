import { useFiltersContext } from '@/context/filters';
import React, { useMemo } from 'react';
import BlogPostCard from './Card';
import { BlogPost } from './Post';

export type BlogPostsModule = {
  _type: 'blogPostsModule';
  _key: string;
  showFilters: boolean;
  content: BlogPost[];
};

export default function BlogPostCards({
  content: posts,
}: BlogPostsModule) {
  const { activeFilters } = useFiltersContext();

  const visiblePosts = useMemo(() => {
    if (!activeFilters || !activeFilters.tags) return posts;
    return activeFilters.tags
      ? filterPosts(posts, activeFilters.tags)
      : posts;
  }, [activeFilters, posts]);

  return (
    <div className="grid gap-10">
      {visiblePosts.map((post) => (
        <BlogPostCard key={post._id} {...post} />
      ))}
    </div>
  );
}

export function filterPosts(posts: BlogPost[], filters: string[]) {
  const filtered = posts.filter((post) => {
    const postFilters = post.tags?.map((tag) => tag.slug);
    const hasFilter = filters?.some((filter) =>
      postFilters?.includes(filter)
    );
    return hasFilter;
  });
  return filtered;
}
