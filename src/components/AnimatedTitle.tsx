import React from 'react';
import { H1 } from './Typography';
import { useTextReverseEffect } from '@/hooks/useTextReverseEffect';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  animate?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'span';
};

export default function AnimatedTitle({
  title,
  animate,
  className,
  as = 'h1',
}: Props) {
  const text = useTextReverseEffect(title, animate);
  return <H1 as={as} className={cn('mb-0', className)}>{text}</H1>;
}
