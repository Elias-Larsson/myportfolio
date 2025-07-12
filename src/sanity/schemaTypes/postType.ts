import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'definition',
      title: 'project definition',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Project description',
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
      title: 'Project image',
      type: 'image',
      validation: (rule) => rule.required(),

    }),
    defineField({
      name: 'techstack',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'liveDemoLink',
      title: 'Live Demo',
      type: 'string',
    }),
    defineField({
      name: 'repoLink',
      title: 'repo link',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
    }),
  ],
})
export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
    }),
    defineField({
      name: 'skills',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required(),
    }),
  ]
})
export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Homepage Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Homepage subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Homepage description',
      type: 'string',
    }),
    defineField({
      name: 'contactDescription',
      title: 'Contact description',
      type: 'string',
    }),
   
  ]
})