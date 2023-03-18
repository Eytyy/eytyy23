import Sketch, { SketchProps } from '@/components/sketch';
import { useCallback, useEffect, useState } from 'react';
import {
  getAllSketchSlugs,
  getSiteSettings,
  getSketchBySlug,
} from '@/lib/sanity.client';
import { GetStaticProps } from 'next';
import { SiteProps } from '@/types';

type Props = {
  page: SketchProps;
  site: SiteProps;
};

type Query = {
  [key: string]: string;
};

export default function SketchPage({ page }: Props) {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const [node, setNode] = useState<HTMLElement | null>(null);

  const measuredRef = useCallback((node: HTMLElement) => {
    if (node !== null) setNode(node);
  }, []);

  useEffect(() => {
    if (node) {
      const onResize = () => {
        const bounds = node.getBoundingClientRect();
        setSize({
          width: bounds.width,
          height: bounds.height - 130,
        });
      };
      onResize();
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, [node]);

  return (
    <section className="h-full" ref={measuredRef}>
      <Sketch {...page} />
    </section>
  );
}

export async function getStaticPaths() {
  const slugs = await getAllSketchSlugs();
  return {
    paths: slugs.map(({ slug }) => `/sketch/${slug}`),
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps<Props, Query> = async (
  ctx
) => {
  const { params = {} } = ctx;

  const [site, page] = await Promise.all([
    getSiteSettings(),
    getSketchBySlug(params.slug),
  ]);
  return { props: { page, site } };
};

SketchPage.getLayout = function getLayout(page: any) {
  return page;
};
