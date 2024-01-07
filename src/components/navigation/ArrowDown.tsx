import { cn } from '@/lib/utils'
import React from 'react'
import { HiArrowNarrowDown } from 'react-icons/hi'

type Props = {
  className?: string
}

export default function ArrowDown({className}: Props) {
  return (
    <HiArrowNarrowDown className={cn("shrink-0 text-[max(3.125rem,8vw)]  2xl:text-[max(3.125rem,7vw)]", className)} />
  )
}