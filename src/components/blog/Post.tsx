import MainBlock from '@/blocks/Main';
import { formatDate } from '@/lib/helpers';
import { Block } from '@/types';
import React from 'react';
import { FilterProps } from '../filters';

export type BlogPost = {
  _id: string;
  title: string;
  blocks: Block[];
  _createdAt: string;
  _updatedAt: string;
  tags: FilterProps[];
  slug: string;
};

export default function BlogPostDisplay({
  title,
  _createdAt,
  blocks,
}: Omit<BlogPost, '_id'>) {
  return (
    <div>
      <div className="mb-2">{formatDate(_createdAt)}</div>
      <h1 className="text-4xl font-bold md:text-6xl">{title}</h1>
      {blocks?.map((block) => (
        <MainBlock key={block._key} block={block} />
      ))}
    </div>
  );
}
