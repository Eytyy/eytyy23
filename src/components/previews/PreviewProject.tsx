import { projectQuery } from '@/lib/queries';
import { usePreview } from '@/lib/sanity.preview';
import React from 'react';
import { SiteProps } from '@/types';
import ProjectDisplay, { ProjectProps } from '../work/ProjectDisplay';

type Props = {
  page: ProjectProps;
  token: null | string;
  site: SiteProps;
};

export default function PreviewProject({ page, site, token }: Props) {
  const project = usePreview(token, projectQuery, {
    slug: page.slug,
  });
  return <ProjectDisplay page={project} />;
}
