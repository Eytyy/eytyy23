import React from 'react';
import MainBlock from '@/components/blocks/Main';
import { Block, PageProps, SiteProps } from '@/types';
import Alert from './AlertBanner';

type Props = {
  page: PageProps;
  site: SiteProps;
  preview?: boolean;
  loading?: boolean;
};

export default function PageDisplay(props: Props) {
  const { preview, loading, page } = props;
  return (
    <>
      <Alert preview={preview} loading={loading} />
      {page.main?.map((block: Block) => (
        <MainBlock key={block._key} block={block} />
      ))}
    </>
  );
}
