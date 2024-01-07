import { GetStaticProps } from 'next';

import { getIndex, getSiteSettings } from '@/lib/sanity.client';
import { SiteProps } from '@/types';
import FrontDisplay, { FrontProps } from '@/components/front/Frontdisplay';

interface Props {
  page: FrontProps;
  site: SiteProps;
}

export default function FrontPage(props: Props) {
  const { page, site } = props;
  return <FrontDisplay page={page} site={site} />;
}

export const getStaticProps: GetStaticProps<
  Props
> = async () => {
  const [site, page] = await Promise.all([
    getSiteSettings(),
    getIndex(),
  ]);

  return {
    props: {
      page,
      site,
    },
  };
};

FrontPage.getLayout = function getLayout(page: React.ReactElement) {
  return <>{page}</>;
};
