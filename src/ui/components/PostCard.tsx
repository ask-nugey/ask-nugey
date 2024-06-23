import Link from "next/link";
import { format } from "date-fns";
import { css } from "@/lib/styled-system/css";
import { Tag } from "antd";
import { Post } from "@/src/app/posts/_type";

type Props = {
  post: Post;
};

export const PostCard = (props: Props) => {
  return (
    <article>
      <Link
        href={props.post.slug}
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
          dateTime={props.post.createdAt.toString()}
          className={css({
            display: "block",
            color: "gray.400",
          })}
        >
          {format(props.post.createdAt, "yyyy/MM/d")}
        </time>
        <h2
          className={css({
            color: "primary.500",
            fontSize: "xl",
            fontWeight: "bold",
          })}
        >
          {props.post.title}
        </h2>
        {props.post.description && (
          <div
            className={css({
              color: "#444",
              fontSize: "md",
            })}
          >
            {props.post.description}
          </div>
        )}
        <div
          className={css({
            display: "flex",
            flexWrap: "wrap",
          })}
        >
          {props.post.tags.map((tag) => (
            <Tag key={tag} color="gold">
              # {tag}
            </Tag>
          ))}
        </div>
      </Link>
    </article>
  );
};
