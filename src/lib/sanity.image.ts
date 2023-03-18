import createImageUrlBuilder from '@sanity/image-url';

import { dataset, projectId } from '@/lib/sanity.api';

const imageBuilder = createImageUrlBuilder({ dataset, projectId });

export const urlFor = (source: object) =>
  imageBuilder.image(source).width(1080).url();
