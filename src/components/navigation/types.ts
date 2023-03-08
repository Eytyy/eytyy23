export type NavPage = {
  _key: string;
  _type: 'navPage';
  title: string;
  page: {
    slug: string;
    _type: string;
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
  items: MenuItemProps[];
};

export type MenuItemProps = NavPage | NavLink;

export type MegaMenuProps = {
  _key: string;
  _type: 'megaMenuBlock';
  title: string;
  orientation: string;
  canToggle: boolean;
  expand: boolean;
  items: (NavGroup | NavMenu)[];
};

export type MenuProps = {
  _key: string;
  title: string;
  _type: 'menuBlock';
  orientation: 'vertical' | 'horizontal';
  canToggle: boolean;
  expand: boolean;
  menu: Menu;
  isDropdown: boolean;
};
