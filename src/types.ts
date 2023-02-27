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

export type NavPage = {
  _key: string;
  title: string;
  _type: 'navPage';
  slug: string;
  page: (ProjectProps | PageProps) & {
    _id: string;
    slug: string;
  };
};

export type NavLink = {
  _key: string;
  title: string;
  _type: 'navLink';
  link: string;
};

export type NavStatic = {
  _key: string;
  title: string;
  _type: 'navStatic';
  slug: string;
};

export type Nav = NavPage | NavLink | NavStatic;
