import useMainNav from '@/hooks/useMainNav';
import CustomLink from './link';
import { Menu } from './types';

export default function MainMenu({ menu }: { menu: Menu }) {
  const { other } = useMainNav(menu);

  return (
    <div className="flex flex-col">
      <span className="mb-2">{menu.title}</span>
      {other?.map((item, idx) => (
        <CustomLink className="font-semibold" key={idx} {...item} />
      ))}
    </div>
  );
}
