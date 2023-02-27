import {contentBlock, imageBlock, videoBlock} from './blocks'
import {menu, page, project, projectStatus, projectType} from './documents'
import {contentModule, mediaModule, projectsModule, seoModule} from './modules'
import {navLink, navPage, navStatic, pageSection, person} from './objects'
import {generalSettings, seoSettings} from './settings'

export const schemaTypes = [
  // other
  contentBlock,
  imageBlock,
  videoBlock,
  pageSection,
  person,
  navLink,
  navPage,
  navStatic,
  contentModule,
  projectsModule,
  seoModule,
  mediaModule,

  // docs
  project,
  projectStatus,
  projectType,
  menu,
  page,

  generalSettings,
  seoSettings,
]
