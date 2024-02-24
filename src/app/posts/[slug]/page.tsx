import { PagePostsDetailView } from "@/src/ui/view/posts/detail";
import { allPosts } from "contentlayer/generated";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  return {
    title: post?.title,
    openGraph: {
      title: post?.title,
      description: post?.description,
    },
    twitter: {
      title: post?.title,
      description: post?.description,
    },
  };
};

const PagePostsDetail = function PagePostsDetail() {
  return <PagePostsDetailView />;
};

export default PagePostsDetail;
