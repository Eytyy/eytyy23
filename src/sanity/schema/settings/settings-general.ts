import {FaExternalLinkSquareAlt, FaLink} from 'react-icons/fa'
import {IoMdCube} from 'react-icons/io'
import {MdMoreHoriz} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  type: 'document',
  title: 'General Settings',
  name: 'generalSettings',
  groups: [
    {title: 'Site Details', name: 'details', default: true},
    {title: 'Displays', name: 'displays'},
    {title: 'Advanced', name: 'advanced'},
    {title: 'Mobile', name: 'mobile'},
  ],
  fields: [
    defineField({
      title: 'Home Page',
      name: 'home',
      type: 'reference',
      to: [{type: 'page'}],
      description: 'This page will show at the root of your domain',
      group: 'displays',
    }),
    defineField({
      title: 'Work Page',
      name: 'work',
      type: 'reference',
      to: [{type: 'page'}],
      description: 'This page will show at "/work"',
      group: 'displays',
    }),
    defineField({
      title: 'Blog Page',
      name: 'blog',
      type: 'reference',
      to: [{type: 'page'}],
      description: 'This page will show at "/blog"',
      group: 'displays',
    }),
    defineField({
      title: 'Error Page (404)',
      name: 'error',
      type: 'reference',
      to: [{type: 'page'}],
      description: 'This page will show for any URL at your domain that does not exist yet',
      group: 'displays',
    }),
    defineField({
      title: 'Menu (1st Block)',
      name: 'mobileMenuFirstBlock',
      type: 'array',
      of: [
        {type: 'contentModule', icon: IoMdCube},
        {type: 'navLink', icon: FaExternalLinkSquareAlt},
        {type: 'navPage', icon: FaLink},
        {type: 'navStatic', icon: FaLink},
        {type: 'menuBlock', icon: MdMoreHoriz},
      ],
      group: 'mobile',
    }),
    defineField({
      title: 'Menu (2nd Block)',
      name: 'mobileMenuSecondtBlock',
      type: 'array',
      of: [
        {type: 'contentModule', icon: IoMdCube},
        {type: 'navLink', icon: FaExternalLinkSquareAlt},
        {type: 'navPage', icon: FaLink},
        {type: 'navStatic', icon: FaLink},
        {type: 'menuBlock', icon: MdMoreHoriz},
      ],
      group: 'mobile',
    }),
    defineField({
      title: 'Menu (Footer)',
      name: 'mobileMenuFooter',
      type: 'array',
      of: [
        {type: 'contentModule', icon: IoMdCube},
        {type: 'navLink', icon: FaExternalLinkSquareAlt},
        {type: 'navPage', icon: FaLink},
        {type: 'navStatic', icon: FaLink},
        {type: 'menuBlock', icon: MdMoreHoriz},
      ],
      group: 'mobile',
    }),
    defineField({
      title: 'Site Title',
      name: 'siteTitle',
      type: 'string',
      description: 'The name of your site, usually your company/brand name',
      group: 'details',
    }),
    defineField({
      title: 'Klaviyo Site ID (Public API Key)',
      description: 'For product waitlists and newsletter forms',
      name: 'klaviyoAccountID',
      type: 'string',
      group: 'advanced',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'General Settings',
      }
    },
  },
})
