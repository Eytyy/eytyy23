import React from 'react';
import { PropsWithChildren } from 'react';

import ProjectSectionFull from './ProjectSectionFull';
import ProjectSectionWithSide from './ProjectSectionWithSide';

import type { ProjectBlockType, SiteProps } from '@/types';
import { ProjectBlock } from './ProjectBlock';
import MediaModule, { MediaModuleType } from '../modules/MediaModule';
import { ContentBlock } from '../blocks';
import { BigText } from '../Typography';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ProjectMainSection from './ProjectMainSection';
import Wrapper from '../ui/Wrapper';

export type ProjectProps = {
  _id: string;
  title: string;
  link: string;
  summary: any[];
  mainMedia: MediaModuleType;
  sections: ProjectBlockType[];
  slug: string;
  theme: 'white' | 'black' | 'blue';
  info: {
    link: {
      title: string;
      url: string;
    },
    client: string;
    discipline: { _id: string; title: string }[];
    sector: { _id: string; title: string }[];
    collaborators: { _id: string; title: string; link: string }[];
    technologies: { _id: string; title: string }[];
  };
};

type Props = {
  page: ProjectProps;
  site: SiteProps
};

export default function ProjectDisplay({ page, site }: Props) {
  return (
    <>
      <div className="bg-pageBG text-pageText transition-all duration-500 ease-linear">
        <Header title={page.title} menus={site.menus} />
        <div className="mt-8 space-y-14 pt-[var(--header-height)] md:mt-10 lg:space-y-32">
          <Wrapper className="space-y-8 md:space-y-16">
            {page.mainMedia && <MediaModule {...page.mainMedia} />}
            {page.summary && (
              <BigText>
                <ContentBlock body={page.summary} />
              </BigText>
            )}
          </Wrapper>
          {page.sections.map((section) => (
            <ProjectSectionWrapper key={section._key} {...section} />
          ))}
        </div>
      </div>
      <Footer title={page.title} menus={site.menus} />
    </>
  );
}

function ProjectSectionWrapper(
  props: PropsWithChildren<ProjectBlockType>
) {
  switch (props._type) {
    case 'fullProjectSection':
      return <ProjectSectionFull {...props} />;
    case 'twoColsProjectSection':
      return <ProjectSectionWithSide {...props} />;
    case 'projectMainSection':
      return <ProjectMainSection {...props} />;
    default:
      return (
        <Wrapper className="relative">
          <ProjectBlock {...props} />
        </Wrapper>
      );
  }
}
