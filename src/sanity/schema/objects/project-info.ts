import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'projectInfo',
  title: 'Project Info',
  type: 'object',
  fields: [
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sector' }] }],
    }),
    defineField({
      name: 'discipline',
      title: 'Discipline',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'discipline' }] }],
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collaborator' }] }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'technology' }] }],
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'navLink',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Project Info',
    }),
  },
});
