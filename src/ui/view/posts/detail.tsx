"use client";

import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound, useParams } from "next/navigation";

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
};

export const PagePostsDetailView = () => {
  const { slug } = useParams();
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div>
      <MDXContent />
    </div>
  );
};
