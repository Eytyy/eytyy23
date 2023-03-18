import {defineType, defineField} from 'sanity'
import {FaLink} from 'react-icons/fa'

export default defineType({
  name: 'navPage',
  title: 'Page Link',
  type: 'object',
  icon: FaLink,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'Page',
      name: 'page',
      type: 'reference',
      to: [{type: 'project'}, {type: 'page'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'page._type',
      pageSlug: 'page.slug.current',
      pageLink: 'page.link',
    },
    prepare({title, pageType, pageSlug, pageLink}) {
      const isDynamic = getDynamicRoute(pageType)
      return {
        title: title,
        subtitle: pageLink ? pageLink : `/${isDynamic ? `${isDynamic}/` : ''}${pageSlug}`,
        media: FaLink,
      }
    },
  },
})

const getDynamicRoute = (name: string) => {
  switch (name) {
    case 'project':
      return 'projects'
    default:
      return false
  }
}
