// @ts-nocheck
import { blogQuery, siteQuery } from '@/lib/queries';
import { usePreview } from '@/lib/sanity.preview';
import { PageProps, SiteProps } from '@/types';
import { Blog } from '../blog';

export default function PreviewBlogPage({
  token,
}: {
  token: null | string;
}) {
  const page: PageProps = usePreview(token, blogQuery);
  const site: SiteProps = usePreview(token, siteQuery);
  return <Blog preview page={page} site={site} />;
}
