import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

export const PostCard = (post: Post) => {
  const Content = getMDXComponent(post.body.code);

  return (
    <div>
      <h2>
        <Link href={post.url}>{post.title}</Link>
      </h2>
      <time dateTime={post.date}>
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <div>
        <Content />
      </div>
    </div>
  );
};
