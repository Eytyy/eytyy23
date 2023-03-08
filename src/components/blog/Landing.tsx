import MainBlock from '@/blocks/Main';

import { Block } from '@/types';
import Filters, { FilterGroup } from '@/components/filters';

type Props = {
  page: {
    main: any;
    filterGroups: FilterGroup[];
  };
  site: any;
};

export default function BlogLanding({ page }: Props) {
  const { filterGroups, main } = page;

  return (
    <>
      <Filters filterGroups={filterGroups} />
      <div className="mt-10">
        {main?.map((block: Block) => (
          <MainBlock key={block._key} block={block} />
        ))}
      </div>
    </>
  );
}
