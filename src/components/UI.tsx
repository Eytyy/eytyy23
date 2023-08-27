import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  as?: 'div' | 'section' | 'article' | 'header';
  className?: string;
  children: React.ReactNode;
};

export const EpicGrid = React.forwardRef(function UIGrid(
  { as = 'div', children, className }: Props,
  ref?: React.Ref<HTMLDivElement>
) {
  const Component = as;

  return (
    <Component
      ref={ref}
      className={twMerge(
        'relative grid h-full grid-cols-6 grid-rows-[max-content_1fr_min-content] p-10 lg:grid-cols-8 lg:grid-rows-3 lg:gap-11 lg:p-16',
        className
      )}
    >
      {children}
    </Component>
  );
});

export function EpicGridTopLeft({
  as = 'div',
  children,
  className,
}: Props) {
  const Component = as;

  return (
    <Component
      className={twMerge('col-span-5 lg:col-span-2', className)}
    >
      {children}
    </Component>
  );
}

export function EpicGridTopRight({
  as = 'div',
  children,
  className,
}: Props) {
  const Component = as;
  return (
    <Component
      className={twMerge(
        'col-start-6 row-start-1 lg:col-start-8',
        className
      )}
    >
      {children}
    </Component>
  );
}

export function EpicGridBottomLeft({
  as = 'div',
  children,
  className,
}: Props) {
  const Component = as;

  return (
    <Component
      className={twMerge(
        'col-span-2 col-start-1 row-span-2 row-start-2 hidden lg:block',
        className
      )}
    >
      {children}
    </Component>
  );
}

export function EpicGridBottomRight({
  as = 'div',
  children,
  className,
}: Props) {
  const Component = as;

  return (
    <Component
      className={twMerge(
        'col-span-full row-start-3 self-end lg:col-span-4 lg:col-start-5',
        className
      )}
    >
      {children}
    </Component>
  );
}

type MainProps = {
  as?: 'div' | 'section' | 'article' | 'header';
  centerContent?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const EpicGridMain = React.forwardRef(function UIGridMain(
  {
    as = 'div',
    centerContent = true,
    children,
    className,
  }: MainProps,
  ref?: React.Ref<HTMLDivElement>
) {
  const Component = as;
  return (
    <Component
      className={twMerge(
        'col-span-full col-start-1 row-start-2 lg:col-span-4 lg:col-start-3 lg:row-span-full lg:row-start-1',
        className
      )}
    >
      <div
        ref={ref}
        className={clsx(
          centerContent &&
            'flex h-full flex-col items-center justify-center'
        )}
      >
        {children}
      </div>
    </Component>
  );
});

export const BasicGrid = React.forwardRef(function UIGrid(
  { as = 'div', children, className }: Props,
  ref?: React.Ref<HTMLDivElement>
) {
  const Component = as;

  return (
    <Component
      ref={ref}
      className={twMerge(
        'relative grid grid-cols-6 p-10 lg:grid-cols-8 lg:gap-11 lg:p-16',
        className
      )}
    >
      {children}
    </Component>
  );
});

export function BasicGridLeft({
  as = 'div',
  children,
  className,
}: Props) {
  const Component = as;

  return (
    <Component
      className={twMerge('col-span-2 col-start-1', className)}
    >
      {children}
    </Component>
  );
}

export function BasicGridMain({
  as = 'div',
  children,
  className,
}: Props) {
  const Component = as;

  return (
    <Component
      className={twMerge(
        'col-span-3 lg:col-start-4 xl:col-start-3',
        className
      )}
    >
      {children}
    </Component>
  );
}

export function BasicGridRight({
  as = 'div',
  children,
  className,
}: Props) {
  const Component = as;

  return (
    <Component
      className={twMerge(
        'col-start-6 flex justify-end lg:col-start-8',
        className
      )}
    >
      {children}
    </Component>
  );
}
