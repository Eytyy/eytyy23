import React from 'react';
import { PortfolioProps, SiteProps } from '@/types';

import PortfolioSection from './PortfolioSection';

type Props = {
  page: PortfolioProps;
  site: SiteProps;
  preview?: boolean;
  loading?: boolean;
};

export default function PortfolioDisplay(props: Props) {
  const { page } = props;

  return (
    <>
      {page.sections?.map((section) => (
        <div key={section._key}>
          <PortfolioSection {...section} />
        </div>
      ))}
    </>
  );
}
