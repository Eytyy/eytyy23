import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function SketchLayout({ children }: Props) {
  return (
    <>
      <div className="bg-pageBG transition-colors duration-300 ease-linear">
        <div className="grid min-h-app grid-cols-8 gap-11 p-8 text-pageText md:p-14">
          <main className="col-span-full col-start-1">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
