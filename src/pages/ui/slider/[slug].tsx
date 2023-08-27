// @ts-nocheck

import { GetStaticProps } from 'next';
import {
  getAllProjectsSlugs,
  getProjectBySlug,
} from '@/lib/sanity.client';
import { ProjectProps } from '@/components/work/ProjectContainer';
import { useMemo } from 'react';
import { MediaModule } from '@/types';
import clsx from 'clsx';

interface Props {
  page: ProjectProps;
}

interface Query {
  [key: string]: string;
}

interface PreviewData {
  token?: string;
}

function generateRandomHSL(index: number, length: number) {
  return `hsl(${(index / length) * 360}, 100%, 50%)`;
}

export default function Slider(props: Props) {
  const { page } = props;
  const content = useMemo(() => {
    return page.sections[1].content.filter(
      (content) => content._type === 'mediaModule'
    )[0] as MediaModule;
  }, [page.sections]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full col-start-4 overflow-hidden">
        <div
          className={clsx(
            'grid-cols-[repeat(auto-full, (88.888%, 1fr))] grid auto-cols-[88.888%] grid-flow-col',
            'snap-x snap-mandatory overflow-x-auto'
          )}
        >
          {content.media.map((slide, idx) => (
            <div
              key={slide._key}
              style={{
                scrollSnapAlign: 'start',
                background: generateRandomHSL(
                  content.media.indexOf(slide),
                  content.media.length
                ),
              }}
            >
              <div className="relative pt-[56.25%]">
                <div className="absolute top-1/2 left-1/2 text-3xl font-bold">
                  {idx}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const slugs = await getAllProjectsSlugs();
  return {
    paths: slugs?.map(({ slug }) => `/ui/slider/${slug}`),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  Props,
  Query,
  PreviewData
> = async (ctx) => {
  const { params = {} } = ctx;

  const [page] = await Promise.all([getProjectBySlug(params.slug)]);

  return {
    props: {
      page,
    },
  };
};
