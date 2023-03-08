import React from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';

import { sanityConfig } from '@/lib/config';
import { ImageProps } from '@/types';

const ImageBlock = ({
  image,
  sizes = `100vw`,
  background = false,
  format = 'default',
  alt = 'untitled',
  objectFit = 'cover',
}: ImageProps) => {
  return format ? (
    <CroppedImage
      background={background}
      image={image}
      sizes={sizes}
      format={format}
      alt={alt}
      objectFit={objectFit}
    />
  ) : (
    <DefaultImage
      background={background}
      image={image}
      sizes={sizes}
      format={format ?? 'default'}
      alt={alt ?? 'untitled'}
      objectFit={objectFit}
    />
  );
};

const getImageHeight = (w: number, format: string) => {
  switch (format) {
    case 'square':
      return w;
    case 'portrait':
      return Math.floor(w * 1.3333);
    case '4:3':
      return Math.floor(w * 0.75);
    default:
      return Math.floor(w * 0.5625);
  }
};

const DefaultImage = ({
  image,
  sizes,
  alt,
  background,
  objectFit,
}: ImageProps) => {
  const imageProps = useNextSanityImage(
    { clientConfig: sanityConfig },
    image,
    {
      imageBuilder: (imgBldr, opts) => {
        if (opts.width !== null) {
          return imgBldr.width(opts.width);
        }
        return imgBldr;
      },
    }
  );

  if (!imageProps) return null;
  return (
    <Image
      // @ts-ignore
      {...imageProps}
      style={{
        width: '100%',
        height: background ? '100%' : 'auto',
        objectFit,
      }}
      sizes={sizes}
      alt={alt}
      placeholder={image.asset.extension === 'svg' ? 'empty' : 'blur'}
      blurDataURL={image.asset.metadata.lqip}
    />
  );
};

const CroppedImage = ({
  format = 'default',
  image,
  sizes,
  alt,
  objectFit,
  background,
}: ImageProps) => {
  const imageProps = useNextSanityImage(
    { clientConfig: sanityConfig },
    image,
    {
      imageBuilder: (imgBldr, opts) => {
        if (opts.width !== null) {
          const w = opts.width;
          const h = getImageHeight(w, format);
          return imgBldr.width(w).height(h);
        }
        return imgBldr;
      },
    }
  );

  if (!imageProps) return null;

  return (
    <Image
      // @ts-ignore
      {...imageProps}
      style={{
        width: '100%',
        height: background ? '100%' : 'auto',
        objectFit,
      }}
      sizes={sizes}
      // @ts-ignore
      height={getImageHeight(imageProps.width, 'default')}
      alt={alt}
      placeholder={image.asset.extension === 'svg' ? 'empty' : 'blur'}
      blurDataURL={image.asset.metadata.lqip}
    />
  );
};

export default ImageBlock;
