import React from 'react';
import { H1 } from './Typography';
import { useTextReverseEffect } from '@/hooks/useTextReverseEffect';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  animate?: boolean;
  className?: string;
};

export default function AnimatedTitle({
  title,
  animate,
  className,
}: Props) {
  const text = useTextReverseEffect(title, animate);
  return <H1 className={cn('mb-0', className)}>{text}</H1>;
}
