import { BlogPostsModule } from './components/blog/Cards';
import { BlogMenu } from './components/front/Frontdisplay';
import { MediaModuleType } from './components/modules/MediaModule';
import { MenuType } from './components/navigation/types';

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
  size: 'full' | 'small' | 'medium';
  format: 'default' | 'square' | 'landscape';
  background?: boolean;
  addBorder?: boolean;
};

export type VideoBlockProps = {
  _key: string;
  _type: 'videoBlock';
  url: string;
  caption: string;
  size: 'full' | 'small' | 'medium';
  autoPlay: boolean;
  loop: boolean;
  inView: boolean;
  cover: ImageBlockProps;
  background?: boolean;
  addBorder?: boolean;
};

export type SiteProps = {
  defaultSEO?: {
    site_title?: string;
    site_description?: any[];
    share_title?: string;
    share_image?: { [key: string]: any };
    share_description?: any[];
  };
  menus: {
    work: MenuType;
    blog: BlogMenu;
    contact: MenuType;
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

export type FullProjectSectionProps = {
  _key: string;
  _type: 'fullProjectSection';
  title: string;
  content: (
    | ImageBlockProps
    | VideoBlockProps
    | ContentBlockProps
    | MediaModuleType
  )[];
};

export type TwoColsProjectSectionProps = {
  _key: string;
  _type: 'twoColsProjectSection';
  title: string;
  content: (
    | ImageBlockProps
    | VideoBlockProps
    | ContentBlockProps
    | MediaModuleType
  )[];
  sideContent: any[];
};

export type ProjectMainSectionProps = {
  _key: string;
  _type: 'projectMainSection';
  title: string;
  media: MediaModuleType;
  projectInfo: {
    link: {
      title: string;
      url: string;
    }
    technologies: {
      _id: string;
      title: string;
    }[];
    sector: {
      _id: string;
      title: string;
    }[];
    discipline: {
      _id: string;
      title: string;
    }[];
    client: string;
    collaborators: {
      _id: string;
      title: string;
      link: string;
    }[];
  };
  content: any[];
};


export type ProjectBlockType =

  | FullProjectSectionProps
  | TwoColsProjectSectionProps
  | ProjectMainSectionProps
  | ImageBlockProps
  | VideoBlockProps
  | MediaModuleType;

export type MainBlocks =
  | ContentBlockProps
  | SketchBlock
  | SketchCollection
  | BlogPostsModule
  | MediaModuleType
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
