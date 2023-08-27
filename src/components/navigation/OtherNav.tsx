import clsx from 'clsx';
import React from 'react';
import { Menu } from './types';
import CustomLink from './link';

export default function OtherNav({
  menu,
  top,
}: {
  menu: Menu;
  top?: boolean;
}) {
  if (!menu) return null;
  return (
    <>
      {/* {menu.items.map((item) => (
        <div
          key={item.title}
          className={clsx(
            top ? 'flex justify-end' : 'flex items-start'
          )}
        >
          <CustomLink className="font-semibold" {...item} />
        </div>
      ))} */}
    </>
  );
}
