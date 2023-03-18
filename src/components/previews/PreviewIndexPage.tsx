import PageDisplay from '@/components/PageDisplay';
import { indexQuery, siteQuery } from '@/lib/queries';
import { usePreview } from '@/lib/sanity.preview';
import { PageProps, SiteProps } from '@/types';

export default function PreviewIndexPage({
  token,
}: {
  token: null | string;
}) {
  const page: PageProps = usePreview(token, indexQuery);
  const site: SiteProps = usePreview(token, siteQuery);
  return <PageDisplay preview page={page} site={site} />;
}
