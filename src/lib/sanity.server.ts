import { createClient } from 'next-sanity';
import { sanityConfig } from './config';

export const sanityClient = createClient(sanityConfig);
export const previewclient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

export const getClient = (preview?: boolean) =>
  preview ? previewclient : sanityClient;
