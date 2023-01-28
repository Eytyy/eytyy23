import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="max-w-screen-2xl mx-auto p-16">{children}</div>
  );
}
