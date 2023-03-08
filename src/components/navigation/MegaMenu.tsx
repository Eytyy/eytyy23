import CustomLink from '@/components/navigation/link';
import { MegaMenuProps, NavGroup, NavMenu } from './types';
import Menu, { MenuHeader } from './Menu';
import useDropdown from '@/hooks/useDropdown';

export default function MegaMenu({
  title,
  canToggle,
  expand,
  items,
}: MegaMenuProps) {
  const { visible, toggle } = useDropdown(expand, canToggle);

  return (
    <div className="grid gap-2">
      <MenuHeader title={title} visible={visible} onClick={toggle} />
      {visible && (
        <div className="flex flex-col justify-between gap-2">
          {items.map((item) => (
            <MegaMenuItem key={item._key} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

function MegaMenuItem(item: NavMenu | NavGroup) {
  if (item._type === 'navMenu') {
    return (
      <Menu
        {...item}
        _type="menuBlock"
        expand={false}
        canToggle={true}
        orientation="vertical"
        isDropdown={true}
      />
    );
  }
  return <Group {...item} />;
}

function Group({ items }: NavGroup) {
  return (
    <div className="nav-group">
      {items.map((item) => (
        <CustomLink key={item._key} {...item} />
      ))}
    </div>
  );
}
