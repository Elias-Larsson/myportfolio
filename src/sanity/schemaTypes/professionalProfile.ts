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
      name: "includeExperienceStarters",
      title: "Include starter experience content",
      description:
        "Turn this off once you want the grid and its case studies to use only your Studio entries.",
      type: "boolean",
      initialValue: true,
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
              name: "relationship",
              title: "Relationship",
              description:
                "For example: Internship, Client project, Founder, or Thesis.",
              type: "string",
            }),
            defineField({
              name: "slug",
              title: "Case study URL",
              description:
                "A unique slug within Experience. Keep it stable after sharing the page.",
              type: "slug",
              options: {
                source: (_document, { parent }) => {
                  return (
                    (parent as { company?: string } | undefined)?.company ?? ""
                  );
                },
              },
              validation: (rule) =>
                rule.custom((value, { document }) => {
                  if (!value?.current) return true;
                  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)) {
                    return "Use lowercase letters, numbers, and hyphens.";
                  }
                  const entries = document?.experiences as
                    | { slug?: { current?: string } }[]
                    | undefined;
                  return (
                    (entries?.filter(
                      ({ slug }) => slug?.current === value.current,
                    ).length ?? 0) < 2 || "Choose a unique case study slug."
                  );
                }),
            }),
            defineField({
              name: "logo",
              title: "Company logo",
              description:
                "Upload a transparent logo that reads well on a dark surface.",
              type: "image",
            }),
            defineField({
              name: "cardSummary",
              title: "Case study preview",
              description: "One short sentence for search result previews.",
              type: "string",
              validation: (rule) => rule.max(180),
            }),
            defineField({
              name: "period",
              title: "Dates",
              type: "string",
              description: "For example: Jan 2024 — Present",
            }),
            defineField({
              name: "summary",
              title: "Experience summary",
              description:
                "Used as the overview when no separate case study overview is provided.",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "achievements",
              title: "Achievements",
              description:
                "Two to four short, impact-focused points shown under My role.",
              type: "array",
              of: [
                defineArrayMember({
                  name: "achievement",
                  type: "string",
                }),
              ],
              validation: (rule) => rule.max(4),
            }),
            defineField({
              name: "technologies",
              title: "Technologies",
              description: "For example: Next.js, tRPC, Jest.",
              type: "array",
              of: [
                defineArrayMember({
                  name: "technology",
                  type: "string",
                }),
              ],
              options: {
                layout: "tags",
              },
            }),
            defineField({
              name: "detail",
              title: "Project focus",
              type: "text",
              rows: 3,
              hidden: true,
            }),
            defineField({
              name: "caseStudy",
              title: "Case study",
              type: "object",
              fields: [
                defineField({
                  name: "overview",
                  title: "Overview",
                  type: "text",
                  rows: 4,
                }),
                defineField({
                  name: "roleDescription",
                  title: "My role",
                  description:
                    "Describe your responsibilities and contributions.",
                  type: "text",
                  rows: 4,
                }),
                defineField({
                  name: "media",
                  title: "Media",
                  description:
                    "Add images or videos in the order they should appear.",
                  type: "array",
                  of: [defineArrayMember({ type: "aboutMedia" })],
                }),
                defineField({
                  name: "challenge",
                  title: "Challenge",
                  type: "text",
                  rows: 4,
                  hidden: true,
                }),
                defineField({
                  name: "solution",
                  title: "Solution",
                  type: "text",
                  rows: 4,
                  hidden: true,
                }),
                defineField({
                  name: "outcome",
                  title: "Outcome",
                  type: "text",
                  rows: 4,
                  hidden: true,
                }),
              ],
            }),
            defineField({
              name: "website",
              title: "Related website",
              type: "url",
              validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
              hidden: true,
            }),
          ],
          preview: {
            select: {
              title: "company",
              subtitle: "role",
              media: "logo",
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
                list: ["Incoming", "Current", "Previous studies"],
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
