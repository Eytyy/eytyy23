import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

export function H1({
  children,
  className,
  as = 'h1',
}: PropsWithChildren<{
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'span';
}>) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        'mb-8 text-left text-[max(3.125rem,8vw)] font-semibold capitalize leading-[1] tracking-[-0.05em] 2xl:text-[max(3.125rem,7vw)]',
        className
      )}
      style={{}}
    >
      {children}
    </Tag>
  );
}

export function H2({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <h2
      className={cn('mb-4 text-5xl font-bold capitalize', className)}
    >
      {children}
    </h2>
  );
}

export function BigText({ children }: PropsWithChildren) {
  return (
    <div className="max-w-[35ch] text-[max(1.75rem,4vw)] leading-[1.1em] lg:font-light">
      {children}
    </div>
  );
}
