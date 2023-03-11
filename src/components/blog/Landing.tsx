import MainBlock from '@/components/blocks/Main';

import { Block } from '@/types';

type Props = {
  page: { main: any };
  site: any;
};

export default function BlogLanding({ page }: Props) {
  const { main } = page;

  return (
    <>
      <section>
        {main?.map((block: Block) => (
          <MainBlock key={block._key} block={block} />
        ))}
      </section>
    </>
  );
}
