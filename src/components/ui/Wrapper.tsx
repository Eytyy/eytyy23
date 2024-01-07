import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react'

type Props = {
  className?: string;
}

export default function Wrapper({children, className}: PropsWithChildren<Props>) {
  return (
    <div className={cn('px-10 lg:px-16 2xl:px-24 max-w-[1920px] mx-auto', className)}>
      {children}
    </div>
  )
}