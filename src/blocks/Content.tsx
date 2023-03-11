import Link from 'next/link';

import { PortableText } from '@portabletext/react';

import { getInternalLink } from '@/lib/helpers';
import ImageBlock from './Image';
import CodeBlock from './Code';

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
    myCodeField: ({ value }) => {
      const {
        language,
        code,
        highlightedLines = [],
        filename,
      } = value;
      return (
        <CodeBlock
          value={code}
          language={
            language === 'sh'
              ? 'powershell'
              : language === 'groq'
              ? 'javascript'
              : language
          }
          markers={highlightedLines}
          filename={filename}
        />
      );
    },
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
    <div className="content">
      <PortableText
        // @ts-ignore
        value={body}
        components={myPortableTextComponents}
      />
    </div>
  );
}
