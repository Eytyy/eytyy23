import { MediaModule } from '@/types';

export type NavPage = {
  _key: string;
  _type: 'navPage';
  title: string;
  page?: {
    slug: string;
    _type: string;
    preview?: MediaModule;
  };
};

export type NavLink = {
  _key: string;
  _type: 'navLink';
  url: string;
  title: string;
};

export type NavMenu = {
  _key: string;
  _type: 'navMenu';
  menu: Menu;
  title: string;
};

export type NavGroup = {
  _key: string;
  _type: 'navGroup';
  items: MenuItemProps[];
};

export type Menu = {
  title: string;
  items: MenuItemProps[];
};

export type MenuItemProps = NavPage | NavLink;
