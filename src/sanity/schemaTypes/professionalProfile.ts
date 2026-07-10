import { defineArrayMember, defineField, defineType } from "sanity";

export const professionalProfile = defineType({
  name: "professionalProfile",
  title: "Experience & Education",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Section heading",
      description: "The first, light-coloured part of the heading.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headingAccent",
      title: "Highlighted heading",
      description: "The red part of the heading.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Section description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "experiences",
      title: "Experience",
      type: "array",
      of: [
        defineArrayMember({
          name: "experienceEntry",
          title: "Experience entry",
          type: "object",
          fields: [
            defineField({
              name: "company",
              title: "Company or client",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "period",
              title: "Dates",
              type: "string",
              description: "For example: Jan 2024 — Present",
            }),
            defineField({
              name: "summary",
              title: "Summary",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "detail",
              title: "Highlight",
              description: "A key outcome, responsibility, or technology.",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "role",
              subtitle: "company",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [
        defineArrayMember({
          name: "educationEntry",
          title: "Education entry",
          type: "object",
          fields: [
            defineField({
              name: "school",
              title: "School",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "programme",
              title: "Programme or specialisation",
              type: "string",
            }),
            defineField({
              name: "period",
              title: "Dates",
              type: "string",
            }),
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: ["Current", "Previous studies"],
                layout: "radio",
              },
            }),
          ],
          preview: {
            select: {
              title: "school",
              subtitle: "programme",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Experience & Education" }),
  },
});
