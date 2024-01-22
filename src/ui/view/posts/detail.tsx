"use client";

import { css } from "@/lib/styled-system/css";
import { Divider, Tag } from "antd";
import { allPosts } from "contentlayer/generated";
import type { MDXComponents } from "mdx/types";
import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { notFound, useParams } from "next/navigation";

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
};

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  hr: () => <Divider />,
};

export const PagePostsDetailView = () => {
  const { slug } = useParams();
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div
      className={css({
        display: "grid",
        gap: 2,

        maxWidth: 1024,
        width: "calc(100% - 16px)",
        margin: " 1rem auto",
        padding: 8,
        backgroundColor: "white",
        border: "1px solid",
        borderColor: "gray.200",
        borderRadius: "xl",

        mdDown: {
          padding: 4,
        },

        "& h2:not([id='目次'])": {
          marginTop: 6,
          padding: 4,
          color: "white",
          fontSize: "xl",
          fontWeight: "bold",
          backgroundColor: "primary.500",
          borderRadius: "xl",
          "& a": {
            color: "inherit",
          },
        },

        "& h3": {
          marginTop: 4,
          color: "primary.500",
          fontSize: "2xl",
          fontWeight: "bold",
          "& a": {
            color: "inherit",
          },
        },

        "& h4": {
          marginTop: 4,
          color: "#333",
          fontSize: "xl",
          fontWeight: "bold",
          "& a": {
            color: "inherit",
          },
        },

        "& h2[id='目次'] a": {
          color: "#333",
          fontSize: "xl",
          textDecoration: "none",
        },
        "& h2[id='目次'] + ul": {
          listStyleType: "disc",
          margin: 0,
          paddingLeft: "1.5em",
        },
        "& h2[id='目次'] + ul ul": {
          paddingLeft: "1.1em",
        },
        "& h2[id='目次'] li": {
          padding: "5px 0",
          listStyleType: "disc",
        },
        "& h2[id='目次'] + ul ul li": {
          listStyleType: "disc",
        },
        "& h2[id='目次'] + ul li a": {
          color: "#333",
          textDecoration: "none",
          lineHeight: 1.8,
          "&:hover": {
            textDecoration: "underline",
          },
        },

        "& pre": {
          borderRadius: "xl",
        },
        "& ul": {
          paddingLeft: "1.5em",
        },
        "& li": {
          listStyleType: "disc",
        },
      })}
    >
      <time
        dateTime={post.createdAt}
        className={css({
          display: "block",
          color: "gray.400",
        })}
      >
        {format(parseISO(post.createdAt), "yyyy/MM/d")}
      </time>
      <h1
        className={css({
          fontSize: "3xl",
          fontWeight: "bold",
        })}
      >
        {post.title}
      </h1>
      <div
        className={css({
          display: "flex",
          flexWrap: "wrap",
          marginBottom: 4,
        })}
      >
        {post.tags.map((tag) => (
          <Tag key={tag} color="gold">
            # {tag}
          </Tag>
        ))}
      </div>
      <MDXContent components={mdxComponents} />
    </div>
  );
};
