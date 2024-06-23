import { Post, PostMeta } from "@/src/app/posts/_type";
import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "src", "post");
export const postSlugs = fs.readdirSync(postsDirectory).filter((file) => {
  const filePath = path.join(postsDirectory, file);
  return (
    fs.statSync(filePath).isDirectory() &&
    fs.existsSync(path.join(filePath, "meta.ts"))
  );
});

export const getPostMeta = (slug: string) => {
  try {
    const { meta }: { meta: PostMeta } = require(`../../post/${slug}/meta`);
    return meta;
  } catch {
    return null;
  }
};

export const getAllPosts = (): Post[] => {
  return postSlugs.map((slug) => {
    const meta = getPostMeta(slug);
    if (!meta) {
      throw new Error(`Meta not found for slug: ${slug}`);
    }
    return { slug, ...meta };
  });
};
