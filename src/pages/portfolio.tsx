import { GetStaticProps } from 'next';

import { getPortfolio, getSiteSettings } from '@/lib/sanity.client';
import { SiteProps, PortfolioProps } from '@/types';
import PortfolioDisplay from '@/components/ProtfolioDisplay';

interface Props {
  page: PortfolioProps;
  site: SiteProps;
}

interface Query {
  [key: string]: string;
}

export default function Porfolio(props: Props) {
  const { page, site } = props;

  return <PortfolioDisplay page={page} site={site} />;
}

export const getStaticProps: GetStaticProps<
  Props,
  Query
> = async () => {
  const [site = {}, page] = await Promise.all([
    getSiteSettings(),
    getPortfolio(),
  ]);

  return {
    props: {
      page,
      site,
    },
  };
};

Porfolio.getLayout = function getLayout(page: React.ReactNode) {
  return <>{page}</>;
};
