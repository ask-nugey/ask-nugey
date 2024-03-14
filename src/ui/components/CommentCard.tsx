"use client";

import Giscus from "@giscus/react";

export const CommentCard = () => {
  return (
    <Giscus
      id="comments"
      repo="ask-nugey/ask-nugey"
      repoId="R_kgDOLHsPGg"
      category="Announcements"
      categoryId="DIC_kwDOLHsPGs4Cd-Fa"
      mapping="title"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light_tritanopia"
      lang="ja"
    />
  );
};
