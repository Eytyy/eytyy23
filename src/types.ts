import { BlogPostsModule } from './components/blog/Cards';

import { Menu } from './components/navigation/types';
import { SketchProps } from './components/sketch';

export type PageProps = {
  title: string;
  slug: string;
  main?: MainBlocks[];
};

export type ImageBlockProps = {
  _key: string;
  _type: 'imageBlock';
  image: ImageProps;
  alt: string;
  caption: string;
};

export type VideoBlockProps = {
  _key: string;
  _type: 'videoBlock';
  url: string;
  autoPlay: boolean;
  loop: boolean;
  inView: boolean;
  alt: string;
  caption: string;
  background?: boolean;
};

export type MediaModule = {
  _key: string;
  _type: 'mediaModule';
  format: 'detailed';
  items: (ImageBlockProps | VideoBlockProps)[];
};

export type SiteProps = {
  defaultSEO?: {
    site_title?: string;
    site_description?: any[];
    share_title?: string;
    share_image?: { [key: string]: any };
    share_description?: any[];
  };
  settings: {
    rootDomain?: string;
    mainMenu: Menu;
    secondaryMenu: Menu;
    footerMenu: Menu;
    mainVisual?: VisualBlocks;
  };
};

export type ContentBlockProps = {
  _type: 'contentModule' | 'advancedContentModule';
  _key: string;
  title: string;
  body: any[];
};

export type SketchBlock = {
  _type: 'sketchBlock';
  _key: string;
  title: string;
  sketch: SketchProps;
};

export type SketchCollection = {
  _type: 'sketchCollectionModule';
  _key: string;
  title: string;
  active?: string;
  hasInlineNavigation: boolean;
  sketches: SketchProps[];
};

export type ProjectsModule = {
  _type: 'projectsModule';
  _key: string;
  showFilters: boolean;
  content: [];
};

export type ProjectSectionType = {
  content: (
    | ImageBlockProps
    | VideoBlockProps
    | ContentBlockProps
    | MediaModule
  )[];
  sideContent: {
    title: string;
    content: any[];
    _key: string;
    fullWidth: boolean;
  }[];
  _key: string;
  title: string;
  theme: 'black' | 'white' | 'blue';
  showSideFirst?: boolean;
};

export type MainBlocks =
  | ContentBlockProps
  | SketchBlock
  | SketchCollection
  | BlogPostsModule
  | MediaModule
  | ImageBlockProps
  | VideoBlockProps;

export type MediaBlocksType =
  | ImageBlockProps
  | VideoBlockProps
  | SketchBlock;

export type VisualBlocks =
  | SketchBlock
  | ImageBlockProps
  | VideoBlockProps;

export type ImageProps = {
  sizes?: string;
  image: any;
  background?: boolean;
  format?: string;
  alt?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
};
