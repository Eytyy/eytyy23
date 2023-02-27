import SketchLayout from '@/components/layouts/sketches';
import Sketch from '@/components/sketches';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';

type Props = {};

const SketchPage: NextPageWithLayout = (props: Props) => {
  const { query } = useRouter();
  if (!query.slug) return null;
  const id = query.slug as string;

  return <Sketch id={id} />;
};

SketchPage.getLayout = function getLayout(page: ReactElement) {
  return <SketchLayout>{page}</SketchLayout>;
};

export default SketchPage;
