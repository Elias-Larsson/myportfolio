import { defineArrayMember, defineField, defineType } from "sanity";

type MediaParent = {
  kind?: "image" | "video";
};

export const aboutMedia = defineType({
  name: "aboutMedia",
  title: "Photo or video",
  type: "object",
  fields: [
    defineField({
      name: "kind",
      title: "Media type",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) =>
        (parent as MediaParent | undefined)?.kind === "video",
      validation: (rule) =>
        rule.custom((value, context) => {
          const kind = (context.parent as MediaParent | undefined)?.kind;
          return kind !== "image" || value ? true : "Choose an image.";
        }),
    }),
    defineField({
      name: "videoFile",
      title: "Video",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      hidden: ({ parent }) =>
        (parent as MediaParent | undefined)?.kind !== "video",
      validation: (rule) =>
        rule.custom((value, context) => {
          const kind = (context.parent as MediaParent | undefined)?.kind;
          return kind !== "video" || value ? true : "Choose a video.";
        }),
    }),
    defineField({
      name: "posterImage",
      title: "Video poster",
      description: "Shown before the video starts playing.",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) =>
        (parent as MediaParent | undefined)?.kind !== "video",
    }),
    defineField({
      name: "captionsFile",
      title: "Captions file",
      description: "Optional WebVTT (.vtt) captions for spoken video.",
      type: "file",
      options: { accept: ".vtt,text/vtt" },
      hidden: ({ parent }) =>
        (parent as MediaParent | undefined)?.kind !== "video",
    }),
    defineField({
      name: "captionsLanguage",
      title: "Captions language",
      description: "A language code such as en or sv.",
      type: "string",
      hidden: ({ parent }) =>
        (parent as MediaParent | undefined)?.kind !== "video",
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      description: "Describe what is happening in the photo or video.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "caption",
      subtitle: "kind",
      image: "image",
      poster: "posterImage",
    },
    prepare({ title, subtitle, image, poster }) {
      return {
        title: title || (subtitle === "video" ? "Video" : "Image"),
        subtitle,
        media: image || poster,
      };
    },
  },
});

export const aboutStorySection = defineType({
  name: "aboutStorySection",
  title: "Story chapter",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Small label",
      description: "For example: Where it started",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Story",
      description: "Paragraph breaks are supported.",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "media",
      title: "Supporting photo or video",
      type: "aboutMedia",
    }),
    defineField({
      name: "layout",
      title: "Media placement on large screens",
      description: "Leave empty to alternate automatically.",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Media left", value: "mediaLeft" },
          { title: "Media right", value: "mediaRight" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
      image: "media.image",
      poster: "media.posterImage",
    },
    prepare({ title, subtitle, image, poster }) {
      return { title, subtitle, media: image || poster };
    },
  },
});

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  groups: [
    { name: "introduction", title: "Introduction", default: true },
    { name: "story", title: "My story" },
  ],
  fields: [
    defineField({
      name: "heading",
      title: "Hero heading",
      description: "The light-coloured part of the heading.",
      type: "string",
      group: "introduction",
    }),
    defineField({
      name: "headingAccent",
      title: "Highlighted hero heading",
      description: "The red part of the heading.",
      type: "string",
      group: "introduction",
    }),
    defineField({
      name: "description",
      title: "Introduction",
      type: "text",
      rows: 7,
      group: "introduction",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "profileImage",
      title: "Profile image",
      type: "image",
      options: { hotspot: true },
      group: "introduction",
    }),
    defineField({
      name: "profileImageAlt",
      title: "Profile image alternative text",
      type: "string",
      group: "introduction",
    }),
    defineField({
      name: "storyHeading",
      title: "Story heading",
      description: "The light-coloured part of the heading.",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "storyHeadingAccent",
      title: "Highlighted story heading",
      description: "The red part of the heading.",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "storyIntroduction",
      title: "Story introduction",
      type: "text",
      rows: 4,
      group: "story",
    }),
    defineField({
      name: "storySections",
      title: "Story chapters",
      type: "array",
      of: [defineArrayMember({ type: "aboutStorySection" })],
      group: "story",
    }),
  ],
  preview: {
    prepare: () => ({ title: "About" }),
  },
});
