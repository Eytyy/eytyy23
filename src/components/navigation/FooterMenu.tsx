import CustomLink from './link';
import { Menu } from './types';

export default function FooterMenu({ menu }: { menu: Menu }) {
  return (
    <nav className="flex justify-between">
      {menu.items.map((item, idx) => (
        <CustomLink key={idx} className="font-semibold" {...item} />
      ))}
    </nav>
  );
}
