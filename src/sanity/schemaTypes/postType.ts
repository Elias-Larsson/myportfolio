import { defineArrayMember, defineField, defineType } from "sanity";

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
      name: "description",
      title: "Short description",
      description: "Shown on project cards and in the project header.",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "longDescription",
      title: "Overview",
      description: "Free-form project details shown below the header.",
      type: "text",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "flagship",
      title: "Flagship project",
      description:
        "Use a full-width card and place it before regular cards on the homepage and in selected case studies.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "projectCategory",
      title: "Archive section",
      description:
        "Selected case studies use image cards. Experiments and uncategorized projects use compact rows.",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Selected case study", value: "caseStudy" },
          { title: "Experiment / learning project", value: "experiment" },
        ],
      },
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      description:
        "Lower numbers appear first within each card size. Unnumbered projects appear after numbered projects.",
      type: "number",
      validation: (rule) => rule.integer().min(0),
    }),
    // Keep older fields registered so existing documents can still be edited.
    defineField({ name: "definition", type: "string", hidden: true }),
    defineField({ name: "year", type: "number", hidden: true }),
    defineField({ name: "outcomeSummary", type: "string", hidden: true }),
    defineField({ name: "role", type: "string", hidden: true }),
    defineField({ name: "team", type: "string", hidden: true }),
    defineField({ name: "timeline", type: "string", hidden: true }),
    defineField({ name: "context", type: "string", hidden: true }),
    defineField({ name: "challenge", type: "text", hidden: true }),
    defineField({ name: "contribution", type: "text", hidden: true }),
    defineField({ name: "technicalDecision", type: "text", hidden: true }),
    defineField({ name: "outcome", type: "text", hidden: true }),
    defineField({ name: "learning", type: "text", hidden: true }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectImage",
      title: "Project image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectImageAlt",
      title: "Project image alternative text",
      type: "string",
    }),
    defineField({
      name: "skills",
      title: "Tech stack",
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
              description:
                "Optional Simple Icons name if it differs from the label.",
              type: "string",
            }),
            defineField({
              name: "url",
              type: "url",
              hidden: true,
            }),
            defineField({
              name: "color",
              type: "string",
              hidden: true,
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
      title: "Repository link",
      type: "string",
    }),
    defineField({
      name: "otherLinks",
      title: "Other project links",
      description: "Add related websites, documentation, or write-ups.",
      type: "array",
      of: [
        defineArrayMember({
          name: "projectLink",
          title: "Project link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        }),
      ],
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
    }),
    defineField({
      name: "backgroundImageAlt",
      title: "Background image alternative text",
      type: "string",
    }),
    defineField({
      name: "previewImage",
      title: "Preview image",
      type: "image",
    }),
    defineField({
      name: "previewImageAlt",
      title: "Preview image alternative text",
      type: "string",
    }),

    defineField({
      name: "video",
      title: "Video preview",
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
      title: "Hero heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Homepage subtitle",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "description",
      title: "Hero description",
      type: "string",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      description:
        "Short location, role, or availability line above the heading.",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "heroHeading",
      title: "Hero heading",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "heroHeadingAccent",
      title: "Hero heading accent",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero description",
      type: "text",
      rows: 3,
      hidden: true,
    }),
    defineField({
      name: "credibilityItems",
      title: "Hero credibility items",
      type: "array",
      of: [{ type: "string" }],
      hidden: true,
    }),
    defineField({
      name: "aboutTeaserTitle",
      title: "About teaser title",
      type: "string",
    }),
    defineField({
      name: "aboutTeaserBody",
      title: "About teaser body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featuredHeading",
      title: "Featured work heading",
      type: "string",
    }),
    defineField({
      name: "featuredDescription",
      title: "Featured work introduction",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerHeading",
      title: "Footer heading",
      type: "string",
    }),
    defineField({
      name: "footerHeadingAccent",
      title: "Footer heading accent",
      type: "string",
    }),
    defineField({
      name: "contactDescription",
      title: "Contact description",
      type: "text",
      hidden: true,
    }),
    defineField({
      name: "skills",
      type: "array",
      hidden: true,
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
