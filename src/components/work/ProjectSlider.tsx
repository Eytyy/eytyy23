// @ts-nocheck

import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { motion, useMotionValue } from 'framer-motion';
import clsx from 'clsx';

import ImageBlock from '@/components/blocks/Image';
import VideoBlock from '@/components/blocks/Video';

import type {
  ImageBlockProps,
  MediaModule,
  VideoBlockProps,
} from '@/types';
import { useMediaQuery } from 'usehooks-ts';
import FloatingCursor from '../FloatingCursor';

type MediaConfigType = {
  autoplay?: boolean;
  background?: boolean;
  objectFit?: 'contain' | 'cover';
  sizes?: string;
  format?: 'landscape' | 'portrait' | 'square' | '4:3' | 'default';
};

type SliderProps = {
  content: MediaModule['media'];
  config?: MediaConfigType;
};

const gap = 44;
const margin = 64;
const cols = 6;

type State = {
  position: number;
  activeIndex: number;
  carouselWidth: number;
  slideWidth: {
    percent: number;
    px: number;
  };
  container_left: number;
};

type Action =
  | {
      type: 'SET_POSITION';
      payload: number;
    }
  | {
      type: 'SET_CAROUSEL_WIDTH';
      payload: number;
    }
  | {
      type: 'SET_BOUNDS';
      payload: {
        slideWidth: {
          percent: number;
          px: number;
        };
        container_left: number;
      };
    }
  | {
      type: 'SET_ACTIVE_SLIDE';
      payload: {
        direction: 'left' | 'right';
      };
    };

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_POSITION':
      return {
        ...state,
        position: action.payload,
      };
    case 'SET_CAROUSEL_WIDTH':
      return {
        ...state,
        carouselWidth: action.payload,
      };
    case 'SET_BOUNDS':
      return {
        ...state,
        slideWidth: action.payload.slideWidth,
        container_left: action.payload.container_left,
      };
    case 'SET_ACTIVE_SLIDE': {
      const { activeIndex, slideWidth } = state;
      const { direction } = action.payload;
      const nextIndex =
        direction === 'left' ? activeIndex - 1 : activeIndex + 1;
      return {
        ...state,
        activeIndex: nextIndex,
        position: nextIndex * slideWidth.px * -1,
      };
    }
    default:
      return state;
  }
}

export default function ProjectSlider({
  content,
  config,
}: SliderProps) {
  const [state, dispatch] = useReducer(reducer, {
    position: 0,
    activeIndex: 0,
    carouselWidth: 0,
    slideWidth: { percent: 0, px: 0 },
    container_left: 0,
  });

  const [cursor, setCursor] = useState({
    visible: false,
    grabbing: false,
    initialX: 0,
    initialY: 0,
  });

  const motionX = useMotionValue(0);

  const isCompact = useMediaQuery('(max-width: 1023px)');

  const [container, setContainer] = useState<HTMLDivElement | null>(
    null
  );
  const [carousel, setCarousel] = useState<HTMLDivElement | null>(
    null
  );

  // calculate slide width and container offset left
  const calculateBounds = useCallback(() => {
    const node = container;
    if (!node) return void 0;
    const { width, left } = node?.getBoundingClientRect();

    if (isCompact) {
      dispatch({
        type: 'SET_BOUNDS',
        payload: {
          slideWidth: { percent: 100, px: width },
          container_left: left,
        },
      });
    } else {
      const colWidth = (width - margin - gap * (cols - 1)) / cols;
      const bleed = colWidth + margin;
      const slideWidth = width - bleed;
      const slideWidthPercent = (slideWidth / width) * 100;

      dispatch({
        type: 'SET_BOUNDS',
        payload: {
          slideWidth: { percent: slideWidthPercent, px: slideWidth },
          container_left: left,
        },
      });
    }
  }, [container, isCompact]);

  const calculateCarouselWidth = useCallback(() => {
    const node = carousel;
    if (!node) return void 0;
    dispatch({
      type: 'SET_CAROUSEL_WIDTH',
      payload: node.scrollWidth - node.offsetWidth,
    });
  }, [carousel]);

  useEffect(() => {
    calculateBounds();
    calculateCarouselWidth();
    window.addEventListener('resize', calculateBounds);
    window.addEventListener('resize', calculateCarouselWidth);
    return () => {
      window.removeEventListener('resize', calculateBounds);
      window.removeEventListener('resize', calculateCarouselWidth);
    };
  }, [calculateBounds, calculateCarouselWidth]);

  const { position, carouselWidth, slideWidth, activeIndex } = state;

  const paginate = useCallback(
    (direction: 'left' | 'right') => {
      if (direction === 'right') {
        if (
          position >= carouselWidth * -1 &&
          activeIndex < content.length - 1
        ) {
          dispatch({
            type: 'SET_ACTIVE_SLIDE',
            payload: { direction: 'right' },
          });
        }
      } else {
        if (position <= slideWidth.px * -1 && activeIndex > 0) {
          dispatch({
            type: 'SET_ACTIVE_SLIDE',
            payload: { direction: 'left' },
          });
        }
      }
    },
    [
      position,
      carouselWidth,
      slideWidth.px,
      activeIndex,
      content.length,
    ]
  );

  const handleCursorGrabbing = useCallback(
    (grabbing: boolean) => setCursor((c) => ({ ...c, grabbing })),
    []
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
      setCursor((c) => ({
        ...c,
        visible: true,
        initialX: e.clientX,
        initialY: e.clientY,
      })),
    []
  );

  const handleMouseLeave = useCallback(
    () => setCursor((c) => ({ ...c, visible: false })),
    []
  );

  const handleMouseDown = useCallback(
    (_: MouseEvent) => handleCursorGrabbing(true),
    [handleCursorGrabbing]
  );

  const handleMouseUp = useCallback(
    (_: MouseEvent) => handleCursorGrabbing(false),
    [handleCursorGrabbing]
  );

  useEffect(() => {
    motionX.set(position);
  }, [motionX, position]);

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseUp]);

  const displayCursor = !isCompact && cursor.visible;
  return (
    <div>
      {displayCursor && (
        <FloatingCursor
          grabbing={cursor.grabbing}
          initialX={cursor.initialX}
          initialY={cursor.initialY}
          container_left={state.container_left}
          paginate={paginate}
        />
      )}
      <motion.div
        ref={(node) => setContainer(node)}
        className={clsx(
          'overflow-hidden',
          cursor.grabbing ? 'cursor-grabbing' : 'cursor-grab'
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative">
          {/* --- start navigation areas --- */}
          <div className="absolute left-0 top-0 z-40 h-full w-24 cursor-pointer" />
          <div className="absolute right-0 top-0 z-40 h-full w-24 cursor-pointer" />
          {/* --- end navigation areas --- */}
          {slideWidth.percent > 0 && (
            <motion.div
              ref={(node) => setCarousel(node)}
              style={{ x: motionX }}
              className="flex"
              animate={{
                x: position,
                transition: { type: 'tween' },
              }}
              drag="x"
              dragConstraints={{
                right: 0,
                left: carouselWidth * -1,
              }}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate('right');
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate('left');
                }
              }}
            >
              {content.map((slide) => (
                <motion.div
                  key={slide._key}
                  style={{ flex: `0 0 ${slideWidth.percent}%` }}
                  className="relative md:pr-11 [&>img]:pointer-events-none"
                >
                  <ProjectSlide
                    key={slide._key}
                    slide={slide}
                    config={config}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
      <p className="w-full max-w-[70ch] px-10 pt-4 md:px-0 lg:min-h-[140px]">
        <span className="mr-2 font-bold">
          {state.activeIndex + 1}/{content.length}:
        </span>
        {content[state.activeIndex].caption}
      </p>
    </div>
  );
}

function ProjectSlide({
  slide,
  config,
}: {
  slide: ImageBlockProps | VideoBlockProps;
  config?: MediaConfigType;
}) {
  return (
    <>
      {slide._type === 'imageBlock' ? (
        <ImageBlock {...slide} {...config} />
      ) : (
        <VideoBlock {...slide} />
      )}
    </>
  );
}
