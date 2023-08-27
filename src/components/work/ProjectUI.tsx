import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// first and last grid columns (1.25) + their adjacent gaps (2.7rem)
// these are considered the "bleed" columns or the grid left and right edges
// 1.25rem + 2.75rem = 4rem === 64px
export function ProjectGrid({
  children,
  className,
  as,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?:
    | 'div'
    | 'section'
    | 'article'
    | 'aside'
    | 'header'
    | 'footer'
    | 'main';
}) {
  const Component = as || 'div';
  return (
    <Component
      className={twMerge(
        'grid gap-10 lg:grid-cols-[1.25em_repeat(8,minmax(0,1fr))_1.25em] lg:gap-x-11',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function ProjectGridMain({
  children,
  className,
  bleed,
  full,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  bleed?: boolean;
  full?: boolean;
}) {
  return (
    <div
      className={twMerge(
        'lg:col-start-5 xl:col-start-4',
        bleed
          ? 'lg:col-span-full'
          : full
          ? 'lg:col-span-6'
          : 'lg:col-span-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ProjectGridLeftCol({
  children,
  className,
  bleed,
}: {
  children: React.ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <div
      className={twMerge(
        'lg:col-span-3 xl:col-span-2',
        bleed
          ? 'lg:col-start-1 xl:col-start-2'
          : 'lg:col-start-2 xl:col-start-2',
        className
      )}
    >
      {children}
    </div>
  );
}

export function ProjectGridRightCol({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'col-start-3 lg:col-span-1 lg:col-start-9',
        className
      )}
    >
      {children}
    </div>
  );
}
