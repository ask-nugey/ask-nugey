import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLink from "rehype-external-links";
import rehypeShiftHeading from "rehype-shift-heading";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkToc from "remark-toc";
import rehypePrism from "@mapbox/rehype-prism";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string" },
    createdAt: { type: "string", required: true },
    updatedAt: { type: "string" },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      // remarkGfm,
      remarkMath,
      [remarkToc, { maxDepth: 3, heading: "目次" }],
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      // rehypeKatex,
      rehypePrism,
      rehypeAccessibleEmojis,
      () =>
        rehypeShiftHeading({
          shift: 1,
        }),
      (option) =>
        rehypeAutolinkHeadings({
          ...option,
          behavior: "wrap",
        }),
      (option) =>
        rehypeExternalLink({
          ...option,
          target: "_blank",
        }),
    ],
  },
});
