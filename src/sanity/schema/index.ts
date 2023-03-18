import { menu, page, project, projectType, tag } from './documents';
import blogPost from './documents/blog-post';
import sketch from './documents/sketch';
import { generalSettings, seoSettings } from './settings';
import { SchemaTypeDefinition } from 'sanity';

import {
  contentBlock,
  imageBlock,
  menuBlock,
  sketchBlock,
  videoBlock,
  advancedContentBlock,
  megaMenuBlock,
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
} from './objects';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // blocks
    advancedContentBlock,
    contentBlock,
    imageBlock,
    videoBlock,
    sketchBlock,
    menuBlock,
    megaMenuBlock,

    // objects
    pageSection,
    person,
    navLink,
    navPage,
    navStatic,
    navType,
    navGroup,
    navMenu,

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

    generalSettings,
    seoSettings,
  ],
};
