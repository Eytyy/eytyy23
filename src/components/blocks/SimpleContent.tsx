import Link from 'next/link';

import { PortableText } from '@portabletext/react';

import { getInternalLink } from '@/lib/helpers';

type Props = {
  body: any;
};

type Portable = {
  marks: {
    [key: string]: (props: any) => JSX.Element;
  };
  types: {
    [key: string]: (props: any) => JSX.Element;
  };
};

const myPortableTextComponents: Portable = {
  marks: {
    link: ({ children, value }) => {
      return (
        <Link
          href={value.href}
          target={value.blank ? '_blank' : '_self'}
        >
          {children}
        </Link>
      );
    },
    internalLink: ({ children, value }) => {
      return (
        <Link
          href={getInternalLink(
            value.reference._type,
            value.reference.slug
          )}
        >
          {children}
        </Link>
      );
    },
  },
  types: {},
};

export default function SimpleContentBlock({ body }: Props) {
  return (
    <div className="side-content">
      <PortableText
        // @ts-ignore
        value={body}
        components={myPortableTextComponents}
      />
    </div>
  );
}
