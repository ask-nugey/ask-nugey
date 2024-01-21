import { PostCard } from "@/src/ui/components/PostCard";
import { compareDesc } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { css } from "@/lib/styled-system/css";
import Image from "next/image";

export const PageHomeView = () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt))
  );

  return (
    <>
      <div
        className={css({
          display: "grid",
          justifyContent: "center",
          paddingRight: 8,
          mdDown: {
            margin: 4,
            paddingRight: 0,
          },
        })}
      >
        <div
          className={css({
            position: "relative",
            zIndex: 0,

            "& span": {
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: -1,
              display: "block",
              width: 400,
              height: 400,
              backgroundColor: "white",
              borderRadius: "100%",
              mdDown: {
                width: "60vw",
                height: "60vw",
              },
            },
          })}
        >
          <Image
            alt="ヌギー(nugey)"
            src="/logo.png"
            width={400}
            height={400}
            className={css({
              marginBottom: "-4vw",
              marginLeft: "auto",
              mdDown: {
                width: "60vw",
                height: "60vw",
                marginBottom: "-10vw",
              },
            })}
          />
          <span
            className={css({
              opacity: 0.9,
              transform: "scale(0.9) translate(39%, 1%)",
              mdDown: {
                transform: "scale(0.9) translate(39%, 1%)",
              },
            })}
          />
          <span
            className={css({
              opacity: 1,
              transform: "scale(0.7) translate(-49%, 12%)",
              mdDown: {
                transform: "scale(0.7) translate(-43%, 7%)",
              },
            })}
          />
          <span
            className={css({
              opacity: 0.9,
              transform: "scale(0.97) translate(-2%, 1%)",
              mdDown: {
                transform: "scale(0.97) translate(-2%, 1%)",
              },
            })}
          />
        </div>
        <p
          className={css({
            position: "relative",
            zIndex: 0,
            color: "gray.300",
            fontSize: "1.5vw",
            fontWeight: "bold",
            mdDown: {
              fontSize: "3.6vw",
            },
          })}
        >
          ヌギーにきいて！
          <br
            className={css({
              md: {
                display: "none",
              },
            })}
          />
          (なんでもは知らないけど)
        </p>
        <p
          className={css({
            position: "relative",
            zIndex: 0,
            display: "flex",
            flexWrap: "wrap",
            columnGap: 4,
            alignItems: "baseline",
            color: "primary.500",
            fontWeight: "bold",
          })}
        >
          <span
            className={css({
              display: "inline-block",
              color: "inherit",
              fontSize: "8vw",
              lineHeight: 1.2,
              mdDown: {
                marginTop: 2,
                fontSize: "12vw",
              },
            })}
          >
            Ask Nugey!
          </span>
          <span
            className={css({
              display: "inline-block",
              color: "inherit",
              fontSize: "2vw",
              mdDown: {
                fontSize: "5vw",
              },
            })}
          >
            (But it doesn&apos;t know everything)
          </span>
        </p>
      </div>

      <div
        className={css({
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          marginTop: 16,
          marginInline: 4,

          "& div": {
            maxWidth: "100%",
            width: 320,
          },
        })}
      >
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </>
  );
};
