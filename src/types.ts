import { BlogPostsModule } from './components/blog/Cards';

import {
  MegaMenuProps,
  MenuProps,
  NavLink,
  NavPage,
} from './components/navigation/types';
import { SketchProps } from './components/sketch';

type Detailed = {
  format: 'detailed';
  blocks: [];
};

type Simple = {
  format: 'link';
  link: string;
};

export type ProjectProps = {
  _type: 'project';
  slug: string;
  title: string;
} & (Detailed | Simple);

export type PageProps = {
  title: string;
  slug: string;
  main?: Block[];
  rightCol?: Block;
  footer?: Block[];
  leftCol?: {
    top?: Block;
    center?: Block;
    bottom?: Block;
  };
};

type ImageBlock = {
  _key: string;
  _type: 'imageBlock';
  image: ImageProps;
  alt: string;
  caption: string;
};

export type VideoBlock = {
  _key: string;
  _type: 'videoBlock';
  url: string;
  autoPlay: boolean;
  loop: boolean;
  cropTop: boolean;
};

export type MediaBlock = {
  _key: string;
  _type: 'mediaModule';
  format: 'detailed';
  media: (ImageBlock | VideoBlock)[];
};

export type PortfolioProps = {
  sections: {
    _key: string;
    anchor: string;
    title: string;
    mainBlocks?: MediaBlock[];
  }[];
};

export type SiteProps = {
  rootDomain?: string;
  defaultSEO?: {
    site_title: string;
    site_description: string;
    share_title: string;
    share_image: string;
    share_description: string;
  };
  mobile_menu?: {
    block_1: Block;
    block_2: Block;
    footer: Block;
  };
};

export type ContentBlock = {
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

export type Block =
  | ContentBlock
  | SketchBlock
  | SketchCollection
  | BlogPostsModule
  | MegaMenuProps
  | MenuProps
  | NavLink
  | NavPage;

export type ImageProps = {
  sizes?: string;
  image: any;
  background?: boolean;
  format?: string;
  alt?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
};
