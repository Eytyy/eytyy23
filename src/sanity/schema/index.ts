import { menu, page, project, projectType, tag } from './documents';
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
  projectsModule,
  seoModule,
  sketchCollectionModule,
  tagsModule,
} from './modules';

import {
  navGroup,
  navLink,
  navMenu,
  navPage,
  navStatic,
  navType,
  pageSection,
  person,
  collaborator,
  projectSection,
} from './objects';
import work from './documents/singletons/work';
import projectSectionColBlock from './blocks/project-section-col-block';

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
    person,
    navLink,
    navPage,
    navStatic,
    navType,
    navGroup,
    navMenu,
    collaborator,

    // modules
    contentModule,
    projectsModule,
    postsModule,
    seoModule,
    mediaModule,
    advancedContentModule,
    sketchCollectionModule,
    tagsModule,

    // docs
    project,
    projectType,
    menu,
    page,
    sketch,
    blogPost,
    tag,

    // singletons
    work,
    generalSettings,
    seoSettings,
  ],
};
