import React from 'react';

import type { ProjectSectionType, SiteProps } from '@/types';
import ProjectDisplay from './ProjectDisplay';
import useThemeSwitch from '@/hooks/useThemeSwitch';
import { ProjectProvider } from '@/context/project';

export type ProjectProps = {
  _id: string;
  title: string;
  link: string;
  sections: ProjectSectionType[];
  slug: string;
  theme: 'white' | 'black' | 'blue';
};

type Props = {
  page: ProjectProps;
  site: SiteProps;
  loading?: boolean;
  preview?: boolean;
};

export default function ProjectContainer({
  page,
  site,
  preview,
  loading,
}: Omit<Props, '_id'>) {
  const theme = useThemeSwitch();

  React.useEffect(() => {
    if (theme) {
      theme.setTheme(page.theme);
    }
  }, [theme, page.theme]);

  return (
    <ProjectProvider project={page}>
      <ProjectDisplay />
    </ProjectProvider>
  );
}
