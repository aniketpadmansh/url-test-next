import Image from "next/image";
import styles from "./partner.module.scss";
import YouTube from "react-youtube";
import dynamic from "next/dynamic";
import Link from "next/link";

const IMAGE = "image/png";
const VIDEO = "video/mp4";
const YT_VIDEO = "video";
const PDF_FILE = "application/pdf";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function PostCard({ downloadPdf, postContent }) {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        {postContent?.header?.title?.split("has")?.[1]}
      </div>

      <div className={styles.postBodyContainer}>
        {postContent?.body?.heading ? (
          <div className={styles.heading}>{postContent?.body?.heading}</div>
        ) : null}

        {postContent?.footer?.attachments?.media?.length > 0 ? (
          <div className={styles.mediaContainer}>
            {postContent?.footer?.attachments?.media?.[0]?.type === IMAGE ? (
              <Image
                fill
                alt=""
                src={postContent?.footer?.attachments?.media?.[0]?.url?.default}
                style={{ objectFit: "contain" }}
              />
            ) : postContent?.footer?.attachments?.media?.[0]?.type === VIDEO ? (
              <ReactPlayer
                loop
                playing
                url={postContent?.footer?.attachments?.media?.[0]?.url?.default}
                height="100%"
                width="100%"
                style={{ position: "absolute", top: 0 }}
              />
            ) : postContent?.footer?.attachments?.media?.[0]?.type ===
              YT_VIDEO ? (
              <YouTube
                videoId={
                  postContent?.footer?.attachments?.media?.[0]?.content_id
                }
                className={styles.ytContainer}
                iframeClassName={styles.ytIframe}
              />
            ) : postContent?.footer?.attachments?.media?.[0]?.type ===
              PDF_FILE ? (
              <Link
                download={
                  postContent?.footer?.attachments?.media?.[0]?.url?.default
                }
                target="_blank"
                rel="noopener noreferrer"
                href={
                  postContent?.footer?.attachments?.media?.[0]?.url?.default
                }
                style={{ width: "100%", height: "100%" }}
              >
                {postContent?.footer?.attachments?.media?.[0]?.thumbnail
                  ?.source ? (
                  <Image
                    fill
                    alt=""
                    src={
                      postContent?.footer?.attachments?.media?.[0]?.thumbnail
                        ?.source
                    }
                    style={{ objectFit: "contain" }}
                  />
                ) : null}
              </Link>
            ) : null}
          </div>
        ) : (
          <div className={styles.description}>
            {postContent?.body?.description}
          </div>
        )}
      </div>

      <div className={styles.postFooter}>
        <p>{postContent?.footer?.likes?.count}</p>
        <p>{postContent?.footer?.comments?.count}</p>
      </div>
    </div>
  );
}
