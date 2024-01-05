import BigText from '@/sanity/components/big-text';
import H2H1 from '@/sanity/components/h2h1';
import { defineType } from 'sanity';

export const linksAnnotation = [
  {
    title: 'External Link',
    name: 'link',
    type: 'object',
    fields: [
      { title: 'URL', name: 'href', type: 'url' },
      {
        title: 'Open in new tab',
        name: 'blank',
        type: 'boolean',
      },
    ],
  },
  {
    title: 'Internal Link',
    name: 'internalLink',
    type: 'object',

    fields: [
      {
        title: 'Reference',
        name: 'reference',
        type: 'reference',
        to: [{ type: 'project' }, { type: 'page' }],
        options: { disableNew: true },
      },
    ],
  },
];

export default defineType({
  title: 'Block Content',
  name: 'contentBlock',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Big', value: 'big', component: BigText },
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H2<H1>', value: 'h2h1', component: H2H1 },
        { title: 'H3', value: 'h3' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [...linksAnnotation],
      },
    },
    { type: 'imageBlock' },
  ],
});
