import useDropdown from '@/hooks/useDropdown';
import clsx from 'clsx';
import CustomLink from './link';
import { MenuProps } from './types';

export default function Menu({
  menu,
  title,
  expand,
  canToggle,
  orientation,
  isDropdown,
}: MenuProps) {
  const initialVisibility = isDropdown ? expand : true;
  const { visible, toggle } = useDropdown(
    initialVisibility,
    canToggle
  );

  const cn = clsx(
    orientation === 'vertical' && `grid`,
    orientation === 'horizontal' && `flex gap-4 justify-between`
  );

  return (
    <div className="nav-menu">
      {isDropdown && (
        <MenuHeader
          title={title}
          visible={visible}
          onClick={toggle}
        />
      )}
      {visible && (
        <div className={cn}>
          {menu.items.map((item) => (
            <CustomLink key={item._key} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

type MenuHeaderProps = {
  title: string;
  visible: boolean;

  onClick: () => void;
};

export function MenuHeader({
  title,
  visible,
  onClick,
}: MenuHeaderProps) {
  return (
    <div>
      <button onClick={onClick} className="flex gap-2">
        {visible ? <span>&uarr;</span> : <span>&darr;</span>}
        {title}
      </button>
    </div>
  );
}
