import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "definition",
      title: "project definition",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Project card description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "project featured",
      type: "boolean",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "longDescription",
      title: "Project long description",
      type: "text",
    }),
    defineField({
      name: "slug",
      type: "slug",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectImage",
      title: "Project image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "icon",
              description: "Pick an icon at simpleicons.org",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "color",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "liveDemoLink",
      title: "Live Demo",
      type: "string",
    }),
    defineField({
      name: "repoLink",
      title: "repo link",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
    }),
    defineField({
      name: "previewImage",
      title: "preview image",
      type: "image",
    }),

    defineField({
      name: "video",
      title: "video preview",
      type: "file",
    }),
  ],
});
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Homepage Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Homepage subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Homepage description",
      type: "string",
    }),
    defineField({
      name: "contactDescription",
      title: "Contact description",
      type: "text",
    }),
    defineField({
      name: "skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "icon",
              description: "Pick an icon at simpleicons.org",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "color",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});
