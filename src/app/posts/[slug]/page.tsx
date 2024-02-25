import { description, siteName } from "@/src/app/layout";
import { PagePostsDetailView } from "@/src/ui/view/posts/detail";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: `${post?.title} | ${siteName}`,
      description: `${post?.description} | ${siteName}`,
      images: [
        {
          url: "https://ask-nugey.com/opengraph-image.png",
        },
      ],
    },
    twitter: {
      title: `${post?.title} | ${siteName}`,
      description: `${post?.description} | ${description}`,
      images: [
        {
          url: "https://ask-nugey.com/opengraph-image.png",
        },
      ],
    },
  };
}

const PagePostsDetail = async function PagePostsDetail({ params }: Props) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  return <PagePostsDetailView post={post} />;
};

export default PagePostsDetail;
