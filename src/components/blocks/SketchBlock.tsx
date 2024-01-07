import React, {
  useRef,
} from 'react';

import Sketch, { SketchProps } from '@/components/sketch';
import useElementBounds from '@/hooks/useElementBounds';
import { cn } from '@/lib/utils';
import { useThemeStore } from '../front/Frontdisplay';
import useMeasure from 'react-use-measure';

export default function SketchBlock(props: SketchProps) {

  const setTheme = useThemeStore(state => state.setTheme)
  setTheme(props.theme)

  return (
    <section className="h-full w-full" >
      <div className={cn('transition-opacity duration-100 ease-linear h-full flex flex-col items-center')}>
          <Sketch {...props} />
      </div>
    </section>
  );
}
