import Link from 'next/link';
import { PortableText } from '@portabletext/react';

import { getInternalLink } from '@/lib/helpers';
import ImageBlock from './Image';

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
    link: ({ children, value, ...props }) => {
      return (
        <Link
          href={value.href}
          target={value.blank ? '_blank' : '_self'}
        >
          {children}
        </Link>
      );
    },
    internalLink: ({ children, value, ...props }) => {
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
  types: {
    imageBlock: ({ value }: any) => {
      return (
        <div className="inlineImg">
          <ImageBlock {...value} />
        </div>
      );
    },
  },
};

export default function ContentBlock({ body }: Props) {
  return (
    <PortableText
      // @ts-ignore
      value={body}
      components={myPortableTextComponents}
    />
  );
}
