import {defineType, defineField} from 'sanity'
import {TbPlugConnected} from 'react-icons/tb'

export default defineType({
  type: 'object',
  title: 'Project Card(s)',
  name: 'projectsModule',
  icon: TbPlugConnected,
  groups: [
    {
      name: 'main',
      title: 'Main',
      default: true,
    },
    {
      name: 'optional',
      title: 'Extra Fields',
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
        'Enables filtering the content by their tags. Tag(s) are aggrigated from the list of pubilshed projects only; tags with no referenced projects will not show up here.',
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
      description: 'If empty, all projects will be displayed',
      hidden: ({parent}) => parent?.referenceType === 'manual',
      group: 'main',
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
      hidden: ({parent}) => parent?.referenceType !== 'manual',
      group: 'main',
    }),

    defineField({
      title: 'Headline',
      name: 'headline',
      type: 'string',
      description: 'optional',
      group: 'optional',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'contentBlock',
      description: 'optional',
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
        title: name ? `Projects: ${name}` : 'Project card(s)',
        subtitle:
          referenceType === 'auto'
            ? `${numberOfItems >= 0 ? numberOfItems : 'All'} items`
            : `${content?.length || 0} cards`,
      }
    },
  },
})
