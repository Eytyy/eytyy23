import { projectQuery } from '@/lib/queries';
import { usePreview } from '@/lib/sanity.preview';
import React from 'react';
import ProjectContainer, {
  ProjectProps,
} from '@/components/work/ProjectContainer';
import { SiteProps } from '@/types';

type Props = {
  page: ProjectProps;
  token: null | string;
  site: SiteProps;
};

export default function PreviewProject({ page, site, token }: Props) {
  const project = usePreview(token, projectQuery, {
    slug: page.slug,
  });
  return <ProjectContainer preview page={project} site={site} />;
}
