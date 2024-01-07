import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react'

type Props = {
  theme: 'blue' | 'black' | 'white';
  className?: string;
}

export default function Container({theme, className, children}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        theme === 'white' && 'bg-white text-black',
        theme === 'black' && 'bg-black text-white',
        theme === 'blue' && 'bg-blue text-white',
        'transition-all duration-500 ease-linear',
        className
      )}
    >{children}</div>
  )
}