import Head from 'next/head';
import React from 'react';
import { blocksToText } from '@/lib/helpers';
import { urlFor } from '@/lib/sanity.image';
import { SiteProps } from '@/types';

type Props = {
  defaultSEO: SiteProps['defaultSEO'];
  title?: string;
  desc?: string | [];
  url?: string;
  type?: string;
  shareTitle?: string;
  shareDesc?: string;
  share_image?: { [key: string]: any };
};

export default function SEO({
  defaultSEO,
  title,
  desc,
  url,
  type,
}: Props) {
  if (!defaultSEO) return null;

  const {
    site_title: default_title,
    site_description: default_desc,
    share_description,
    share_title,
    share_image,
  } = defaultSEO;

  const seoTitle = title
    ? `${default_title} | ${title}`
    : default_title;

  const seoDesc = desc
    ? Array.isArray(desc)
      ? blocksToText(desc)
      : desc
    : default_desc
    ? blocksToText(default_desc)
    : '';

  const seoType = type || 'website';
  const seoURL = url || 'https://www.ashraqatarts.com/';

  return (
    <Head>
      <link rel="preconnect" href="https://hull-demo.myshopify.com" />
      <link
        rel="preconnect"
        href="https://cdn.sanity.io"
        crossOrigin=""
      />

      {/* <title>Eytyy | {seoTitle}</title> */}
      <link rel="icon" href="/favicon.ico" />
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDesc} />
      {share_title && (
        <>
          <meta property="og:title" content={share_title} />
          <meta name="twitter:title" content={share_title} />
        </>
      )}

      {share_description && (
        <>
          <meta
            property="og:description"
            content={blocksToText(share_description)}
          />
          <meta
            name="twitter:description"
            content={blocksToText(share_description)}
          />
        </>
      )}

      {share_image && (
        <>
          <meta property="og:image" content={urlFor(share_image)} />
          <meta name="twitter:image" content={urlFor(share_image)} />
        </>
      )}

      <meta property="og:type" content={seoType} />
      <meta property="og:url" content={seoURL} />
    </Head>
  );
}
