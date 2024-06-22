import { PostCard } from "@/src/ui/components/PostCard";
import { compareDesc } from "date-fns";
import { css } from "@/lib/styled-system/css";
import Image from "next/image";

export const PageHomeView = () => {
  const posts: any = "";

  return (
    <>
      <div
        className={css({
          display: "grid",
          justifyContent: "center",
          paddingRight: 8,
          overflow: "hidden",
          mdDown: {
            margin: 4,
            paddingRight: 0,
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
        <p
          className={css({
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
            md: {
              maxWidth: "100%",
              width: 320,
            },
            mdDown: {
              width: "calc(100% - 16px)",
            },
          },
        })}
      >
        {/* {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))} */}
      </div>
    </>
  );
};
