import { GetStaticProps } from 'next';

import { getPortfolio, getSiteSettings } from '@/lib/sanity.client';
import { SiteProps, PortfolioProps } from '@/types';
import PortfolioDisplay from '@/components/ProtfolioDisplay';
import PortfolioLayout from '@/components/PortfolioLayout';
import Head from 'next/head';

interface Props {
  page: PortfolioProps;
  site: SiteProps;
}

interface Query {
  [key: string]: string;
}

export default function Porfolio(props: Props) {
  const { page, site } = props;

  return (
    <>
      <Head>
        <title>eytyy</title>
        <meta
          name="description"
          content="Eyas Tayyem. Independent creative coder, and consultant."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PortfolioDisplay page={page} site={site} />
    </>
  );
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

Porfolio.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
