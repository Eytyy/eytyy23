import { BlogPostsModule } from './components/blog/Cards';

import {
  MegaMenuProps,
  MenuProps,
  NavLink,
  NavPage,
} from './components/navigation/types';
import { SketchProps } from './components/Sketch';

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
  _type: 'page';
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
