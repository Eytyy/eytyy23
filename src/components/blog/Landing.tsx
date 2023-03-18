import MainBlock from '@/components/blocks/Main';

import { Block, PageProps, SiteProps } from '@/types';
import Alert from '../AlertBanner';

type Props = {
  page: PageProps;
  site: SiteProps;
  preview?: boolean;
  loading?: boolean;
};

export default function BlogLanding(props: Props) {
  const { page, loading, preview } = props;

  return (
    <>
      <Alert loading={loading} preview={preview} />
      <section>
        {page.main?.map((block: Block) => (
          <MainBlock key={block._key} block={block} />
        ))}
      </section>
    </>
  );
}
