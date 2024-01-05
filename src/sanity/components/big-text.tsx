import React, { PropsWithChildren } from 'react';

export default function BigText(props: PropsWithChildren) {
  return <span className="text-2xl">{props.children}</span>;
}
