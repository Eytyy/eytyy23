import Link from 'next/link';

import {
  PortableText,
  PortableTextComponents,
} from '@portabletext/react';

import { getInternalLink } from '@/lib/helpers';
import ImageBlock from './Image';
import CodeBlock from './Code';
import { cn } from '@/lib/utils';
import { H1, H2, BigText } from '@/components/Typography';

type Props = {
  body: any;
  className?: string;
};

const myPortableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <H2>{children}</H2>,
    big: ({ children }) => <BigText>{children}</BigText>,
    h2h1: ({ children }) => <H1 as="h2">{children}</H1>,
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-semibold">{children}</span>
    ),
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

export default function ContentBlock({ body, className }: Props) {
  return (
    <div className={cn(className)}>
      <PortableText
        value={body}
        components={myPortableTextComponents}
      />
    </div>
  );
}
