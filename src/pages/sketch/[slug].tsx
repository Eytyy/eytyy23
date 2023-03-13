import Sketch, { SketchProps } from '@/components/sketch';
import { siteQuery } from '@/lib/queries';
import { getClient } from '@/lib/sanity.server';

import React, { useCallback, useLayoutEffect, useState } from 'react';

type Props = {
  page: SketchProps;
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

  useLayoutEffect(() => {
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
  const paths = await getClient().fetch(
    `*[_type == 'sketch' && defined(slug)][].slug.current`
  );
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getClient().fetch(
    `{
      "page": *[_type == 'sketch' && slug.current == $slug][0],
      "site": ${siteQuery}
    }`,
    { slug: params.slug }
  );
  return { props: { page: data.page, site: data.site } };
}

SketchPage.getLayout = function getLayout(page: any) {
  return page;
};
