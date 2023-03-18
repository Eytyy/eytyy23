import MainBlock from '@/components/blocks/Main';
import { formatDate } from '@/lib/helpers';
import { Block } from '@/types';
import React from 'react';
import Alert from '../AlertBanner';
import { FilterProps } from '../filters';

export type BlogPost = {
  _id: string;
  title: string;
  blocks: Block[];
  summary: any;
  _createdAt: string;
  _updatedAt: string;
  tags: FilterProps[];
  slug: string;
};

type Props = {
  page: BlogPost;
  loading?: boolean;
  preview?: boolean;
};

export default function BlogPostDisplay({
  page,
  preview,
  loading,
}: Omit<Props, '_id'>) {
  const { title, _createdAt, blocks } = page;
  return (
    <div>
      <Alert loading={loading} preview={preview} />
      <div className="mb-2">{formatDate(_createdAt)}</div>
      <h1 className="text-4xl font-bold md:text-6xl">{title}</h1>
      {blocks?.map((block) => (
        <MainBlock key={block._key} block={block} />
      ))}
    </div>
  );
}
