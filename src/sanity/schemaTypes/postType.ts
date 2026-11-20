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
      name: "definition",
      title: "Project definition",
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
      title: "Featured on homepage",
      type: "boolean",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectCategory",
      title: "Archive section",
      description:
        "Selected case studies appear first; experiments appear in the compact archive.",
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
        "Lower numbers appear first. Leave empty to use the curated fallback order.",
      type: "number",
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "year",
      title: "Project year",
      type: "number",
      validation: (rule) => rule.integer().min(2000).max(2100),
    }),
    defineField({
      name: "outcomeSummary",
      title: "Outcome summary",
      description:
        "One concrete sentence used above the fold and in link previews.",
      type: "string",
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "string",
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      description: "For example: Mar — Jun 2025",
      type: "string",
    }),
    defineField({
      name: "context",
      title: "Context",
      description: "For example: Independent project or Chas Challenge",
      type: "string",
    }),
    defineField({
      name: "longDescription",
      title: "Project long description",
      type: "text",
    }),
    defineField({
      name: "challenge",
      title: "01 · The challenge",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "contribution",
      title: "02 · My contribution",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "technicalDecision",
      title: "03 · Technical decision",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "outcome",
      title: "04 · Outcome",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "learning",
      title: "05 · What I learned",
      type: "text",
      rows: 5,
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
      name: "projectImageAlt",
      title: "Project image alternative text",
      type: "string",
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
      name: "heroEyebrow",
      title: "Hero eyebrow",
      description: "Short location, role, or availability line above the heading.",
      type: "string",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero heading",
      type: "string",
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
    }),
    defineField({
      name: "credibilityItems",
      title: "Hero credibility items",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(4),
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
