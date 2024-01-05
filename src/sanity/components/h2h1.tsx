import React, { PropsWithChildren } from 'react';

export default function H2H1({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        fontWeight: 700,
        padding: ' 1px 0',
        margin: 0,
        fontSize: '2.375rem',
        lineHeight: 'calc(45 / 38)',
      }}
    >
      {children}
    </div>
  );
}
