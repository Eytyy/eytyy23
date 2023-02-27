import { getPreviewQuery } from '@/lib/queries';
import { usePreview } from '@/lib/sanity.client';
import PreviewStatus from './status';

type Props = {
  page: string;
  render: ({
    page,
    site,
  }: {
    page: any;
    site: any;
  }) => React.ReactNode;
};

export default function Preview({ page, render }: Props) {
  const data = usePreview(null, getPreviewQuery(page), {
    page,
  });

  return (
    <>
      <PreviewStatus />
      {render({ page: data.page, site: data.site })}
    </>
  );
}
