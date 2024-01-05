import React from 'react';
import { PropsWithChildren } from 'react';

import ProjectSectionFull from './ProjectSectionFull';
import ProjectSectionWithSide from './ProjectSectionWithSide';

import type { ProjectBlockType } from '@/types';
import { ProjectBlock } from './ProjectBlock';
import MediaModule, { MediaModuleType } from '../modules/MediaModule';
import { ContentBlock } from '../blocks';
import { BigText } from '../Typography';
import Header from '../Header';
import { useApp } from '@/context/app';
import Footer from '../Footer';
import ProjectMainSection from './ProjectMainSection';

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
    client: string;
    discipline: { _id: string; title: string }[];
    sector: { _id: string; title: string }[];
    collaborators: { _id: string; title: string; link: string }[];
  };
};

type Props = {
  page: ProjectProps;
};

export default function ProjectDisplay({ page }: Props) {
  const { menus } = useApp();
  return (
    <>
      <div className="bg-pageBG text-pageText transition-all duration-500 ease-linear">
        <Header title={page.title} menus={menus.work} />
        <div className="mt-8 space-y-14 pt-[var(--header-height)] md:mt-10 lg:space-y-32">
          <div className="mx-auto max-w-[1920px] space-y-8 px-10 md:space-y-16 lg:px-16 2xl:px-24">
            {page.mainMedia && <MediaModule {...page.mainMedia} />}
            {page.summary && (
              <BigText>
                <ContentBlock body={page.summary} />
              </BigText>
            )}
          </div>
          {page.sections.map((section) => (
            <ProjectSectionWrapper key={section._key} {...section} />
          ))}
        </div>
      </div>
      <Footer title={page.title} menus={menus.work} />
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
        <div className="relative px-16 pl-44">
          <ProjectBlock {...props} />
        </div>
      );
  }
}
