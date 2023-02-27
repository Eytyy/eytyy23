import createImageUrlBuilder from '@sanity/image-url';
import { definePreview } from 'next-sanity/preview';
import { sanityConfig } from './config';
const imageBuilder = createImageUrlBuilder(sanityConfig);

export const urlFor = (source: object) =>
  imageBuilder.image(source).width(1080).url();

export const usePreview = definePreview({
  dataset: sanityConfig.dataset,
  projectId: sanityConfig.projectId,
});
