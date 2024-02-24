import { description, siteName } from "@/src/app/layout";
import { PagePostsDetailView } from "@/src/ui/view/posts/detail";
import { allPosts } from "contentlayer/generated";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  return {
    title: `${post?.title} | ${siteName}`,
    openGraph: {
      title: `${post?.title} | ${siteName}`,
      description: `${post?.description} | ${siteName}`,
    },
    twitter: {
      title: `${post?.title} | ${siteName}`,
      description: `${post?.description} | ${description}`,
    },
  };
};

const PagePostsDetail = function PagePostsDetail() {
  return <PagePostsDetailView />;
};

export default PagePostsDetail;
