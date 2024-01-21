import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import { css } from "@/lib/styled-system/css";
import { Tag } from "antd";

export const PostCard = (post: Post) => {
  return (
    <article>
      <Link
        href={post.url}
        className={css({
          display: "grid",
          gap: 2,
          padding: 6,
          bgColor: "white",
          border: "1px solid",
          borderColor: "gray.300",
          borderRadius: "2xl",
          overflow: "hidden",

          "& h2": {
            textDecoration: "underline",
          },
          "&:hover h2": {
            textDecoration: "none",
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
        <h2
          className={css({
            color: "primary.500",
            fontSize: "xl",
            fontWeight: "bold",
          })}
        >
          {post.title}
        </h2>
        {post.description && (
          <div
            className={css({
              color: "#444",
              fontSize: "md",
            })}
          >
            {post.description}
          </div>
        )}
        <div
          className={css({
            display: "flex",
            flexWrap: "wrap",
          })}
        >
          {post.tags.map((tag) => (
            <Tag key={tag} color="gold">
              # {tag}
            </Tag>
          ))}
        </div>
      </Link>
    </article>
  );
};
