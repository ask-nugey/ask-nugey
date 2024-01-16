import { PostCard } from "@/src/ui/components/PostCard";
import { compareDesc } from "date-fns";
import { allPosts } from "contentlayer/generated";

export const PageHomeView = () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <>
      <h1>main</h1>
      <div>
        <h1>Next.js Example</h1>

        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </>
  );
};
