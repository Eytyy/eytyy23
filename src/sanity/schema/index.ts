import {
  collaborator,
  discipline,
  page,
  project,
  sector,
  tag,
  technology
} from './documents';
import blogPost from './documents/blog-post';
import sketch from './documents/sketch';
import { generalSettings, seoSettings } from './settings';
import { SchemaTypeDefinition } from 'sanity';

import {
  contentBlock,
  imageBlock,
  sketchBlock,
  videoBlock,
  advancedContentBlock,
} from './blocks';

import {
  advancedContentModule,
  contentModule,
  mediaModule,
  postsModule,
  seoModule,
  sketchCollectionModule,
  tagsModule,
} from './modules';

import {
  navGroup,
  navLink,
  navPage,
  navStatic,
  navType,
  pageSection,
  person,
  projectInfo,
  projectMainSection,
  projectSection,
  projectSectionFull,
  projectTechSection,
} from './objects';
import work from './documents/singletons/work';
import projectSectionColBlock from './blocks/project-section-col-block';
import projectType from './documents/project-type';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // blocks
    advancedContentBlock,
    contentBlock,
    imageBlock,
    videoBlock,
    sketchBlock,
    projectSectionColBlock,

    // objects
    pageSection,
    projectSection,
    projectSectionFull,
    projectMainSection,
    person,
    navLink,
    navPage,
    navStatic,
    navType,
    navGroup,
    projectInfo,
    projectTechSection,

    // modules
    contentModule,
    postsModule,
    seoModule,
    mediaModule,
    advancedContentModule,
    sketchCollectionModule,
    tagsModule,

    // docs
    project,
    projectType,
    page,
    sketch,
    blogPost,
    tag,
    discipline,
    sector,
    collaborator,
    technology,

    // singletons
    work,
    generalSettings,
    seoSettings,
  ],
};
