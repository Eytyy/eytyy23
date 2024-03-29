export type NavPageType = {
  _id: string;
  _type: 'navPage';
  title: string;
  slug: string;
};

export type NavBlogType = {
  _id: string;
  _type: 'navBlog';
  title: string;
  slug: string;
  summary: any[]
  _createdAt: string
};


export type NavLinkType = {
  _id: string;
  _type: 'navLink';
  url: string;
  title: string;
};

export type MenuType = {
  title: string;
  items: (NavPageType | NavLinkType | NavBlogType)[];
};
