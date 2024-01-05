import { ImageBlockProps, VideoBlockProps } from '@/types';
import Slider from '../Slider';
import { cn } from '@/lib/utils';
import { MediaBlock } from '../blocks';
import GridGallery from '../GridGallery';

export type MediaModuleType = {
  _key: string;
  _type: 'mediaModule';
  format: 'slider' | 'grid';
  media: (ImageBlockProps | VideoBlockProps)[];
};

export type MediaConfigType = {
  autoplay?: boolean;
  background?: boolean;
  objectFit?: 'contain' | 'cover';
  sizes?: string;
  format?: 'landscape' | 'portrait' | 'square' | '4:3' | 'default';
};

export default function MediaModule({
  media,
  ...props
}: MediaModuleType) {
  console.log(props);
  const isSlider = media.length > 1;
  if (isSlider) {
    if (props.format === 'grid') {
      return <GridGallery {...props} media={media} />;
    }
    return (
      <Slider
        content={media}
        config={{
          format: 'landscape',
          objectFit: 'cover',
        }}
      />
    );
  }
  const slide = media[0];
  return (
    <div
      className={cn(
        slide.addBorder && 'shadow-[0px_0px_10px_-1px_#ccc]',
        slide.addBorder && 'p-10'
      )}
    >
      <div
        className={cn(
          slide.size === 'small' && 'mx-auto lg:max-w-[50%]',
          slide.size === 'medium' && 'mx-auto lg:max-w-[75%]'
        )}
      >
        <MediaBlock {...slide} />
      </div>
    </div>
  );
}
