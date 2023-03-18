import PageDisplay from '@/components/PageDisplay';
import { pageQuery, siteQuery } from '@/lib/queries';
import { usePreview } from '@/lib/sanity.preview';
import { PageProps, SiteProps } from '@/types';

export default function PreviewPage({
  token,
  page,
}: {
  token: null | string;
} & { page: PageProps }) {
  const pagePreview: PageProps = usePreview(token, pageQuery, {
    slug: page.slug,
  });
  const site: SiteProps = usePreview(token, siteQuery);
  return <PageDisplay preview page={pagePreview} site={site} />;
}
