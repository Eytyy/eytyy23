import React from 'react';
import Head from 'next/head';
import { useInView, motion, AnimatePresence } from 'framer-motion';

import Alert from '../AlertBanner';
import {
  FiltersContextProvider,
  useFiltersContext,
} from '@/context/filters';

import {
  BasicGrid,
  BasicGridLeft,
  BasicGridMain,
  BasicGridRight,
} from '../UI';
import MainBlock from '@/components/blocks/Main';
import Logos from '../Logos';
import Filters, { FilterGroup } from './Filters';

import type { MainBlocks, PageProps, SiteProps } from '@/types';
import clsx from 'clsx';
import SuperMenu from '../SuperMenu';
import { HiArrowNarrowDown } from 'react-icons/hi';

type Props = {
  page: PageProps;
  site: SiteProps;
  filterGroups: FilterGroup[];
  preview?: boolean;
  loading?: boolean;
};

export default function BlogLanding(props: Props) {
  const { page, loading, preview, filterGroups, site } = props;
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className="bg-pageBG text-pageText">
      <Alert loading={loading} preview={preview} />
      <Head>
        <title>eytyy</title>
        <meta
          name="description"
          content="Eyas Tayyem freelance creative coder, researcher, strategist and consultant."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FiltersContextProvider>
        <BlogHeader
          toggleFilters={() => setShowFilters(!showFilters)}
          isFiltersOpen={showFilters}
        />
        <BasicGrid
          as="section"
          className="min-h-screen gap-y-10 pt-0 lg:pt-0"
        >
          <BasicGridMain className="main col-span-5 lg:col-span-4">
            <motion.div
              className={clsx(
                'stick top-[var(--header-height)]',
                showFilters ? 'mb-10 lg:mb-14' : 'mb-0'
              )}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: showFilters ? 1 : 0,
                height: showFilters ? 'auto' : 0,
              }}
            >
              <Filters filterGroups={filterGroups} />
            </motion.div>
            <motion.div>
              {page.main?.map((block: MainBlocks) => (
                <MainBlock key={block._key} block={block} />
              ))}
            </motion.div>
          </BasicGridMain>
        </BasicGrid>
      </FiltersContextProvider>
    </div>
  );
}

function BlogHeader({
  toggleFilters,
  isFiltersOpen,
}: {
  toggleFilters: () => void;
  isFiltersOpen: boolean;
}) {
  const { clearFilters, activeFilters } = useFiltersContext();
  const tags = activeFilters?.tags;

  return (
    <BasicGrid
      as="header"
      className={clsx(
        'sticky top-0 z-50 w-full bg-pageBG px-10 py-10 lg:px-16 lg:py-14'
      )}
    >
      <BasicGridLeft>
        <SuperMenu pageTitle={'blog'} />
      </BasicGridLeft>
      <BasicGridMain className={clsx('lg:text-left')}>
        <button
          className="flex items-center gap-1 font-bold"
          onClick={() => toggleFilters()}
        >
          <motion.div animate={{ rotate: isFiltersOpen ? 180 : 0 }}>
            <HiArrowNarrowDown className="text-2xl" />
          </motion.div>
          {tags && tags.length > 0 ? (
            <div className="flex gap-2">
              {tags.map((tag) => (
                <span key={`selected-${tag}`} className="font-bold">
                  #{tag}
                </span>
              ))}
            </div>
          ) : (
            'All'
          )}
        </button>
      </BasicGridMain>
      <BasicGridRight>
        <Logos />
      </BasicGridRight>
    </BasicGrid>
  );
}
