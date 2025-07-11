import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'projectTitle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projectDescription',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'project',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projectImage',
      type: 'image',
      validation: (rule) => rule.required(),

    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})