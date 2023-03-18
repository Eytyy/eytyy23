import {defineType, defineField} from 'sanity'
import {TbPlugConnected} from 'react-icons/tb'

export default defineType({
  type: 'object',
  title: 'Blog Post Card(s)',
  name: 'blogPostsModule',
  icon: TbPlugConnected,
  groups: [
    {
      name: 'main',
      title: 'Main',
      default: true,
    },
    {
      name: 'optional',
      title: 'Optional Fields',
    },
  ],
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'showFilters',
      title: 'Show filters?',
      description:
        'Enables filtering the content by their tags. Tag(s) are aggrigated from the list of pubilshed posts only; tags with no referenced posts will not show up here.',
      type: 'boolean',
      initialValue: true,
      group: 'main',
    }),
    defineField({
      title: 'Do you want to select products manually or automatically?',
      name: 'referenceType',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Automatic', value: 'auto'},
          {title: 'Manual', value: 'manual'},
        ],
      },
      initialValue: 'auto',
      group: 'main',
    }),
    defineField({
      title: 'How many items do you want to display?',
      name: 'numberOfItems',
      type: 'number',
      description: 'If empty, all blog posts will be displayed',
      hidden: ({parent}) => parent?.referenceType === 'manual',
      group: 'main',
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'blogPost'}]}],
      hidden: ({parent}) => parent?.referenceType !== 'manual',
      group: 'main',
    }),
    defineField({
      title: 'Headline',
      name: 'headline',
      type: 'string',
      group: 'optional',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'contentBlock',
      group: 'optional',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      referenceType: 'referenceType',
      numberOfItems: 'numberOfItems',
      content: 'content',
    },
    prepare({name, referenceType, numberOfItems, content}) {
      return {
        media: TbPlugConnected,
        title: name ? `Blog Posts: ${name}` : 'Blog post card(s)',
        subtitle:
          referenceType === 'auto'
            ? `${numberOfItems >= 0 ? numberOfItems : 'All'} items`
            : `${content?.length || 0} cards`,
      }
    },
  },
})
