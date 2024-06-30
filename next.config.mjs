import rehypePrism from "@mapbox/rehype-prism";
import nextMDX from "@next/mdx";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  swcMinify: true,
};

const withMdx = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      [remarkToc, { maxDepth: 3, heading: "目次" }],
    ],
    rehypePlugins: [rehypeKatex, rehypePrism, rehypeSlug],
  },
});

export default withMdx(nextConfig);
