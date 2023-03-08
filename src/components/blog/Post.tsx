import { Block } from '@/types';
import React from 'react';
import { FilterProps } from '../filters';

export type BlogPost = {
  _id: string;
  title: string;
  blocks: Block;
  slug: string;
  _createdAt: string;
  _updatedAt: string;
  tags: FilterProps[];
};

export default function BlogPostPageDisplay(props: BlogPost) {
  return <div>BlogPostPageDisplay</div>;
}
