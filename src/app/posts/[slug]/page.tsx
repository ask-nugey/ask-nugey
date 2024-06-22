import { PagePostsDetailView } from "@/src/ui/view/posts/detail";
import { Metadata } from "next";

const siteName = "Ask Nugey!（ヌギーにきいて!）";
const description = "Ask Nugey! → プログラミング、デザイン、AI、CSS...etc";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post: any = "";

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
  const post: any = "";

  return <PagePostsDetailView post={post} />;
};

export default PagePostsDetail;
