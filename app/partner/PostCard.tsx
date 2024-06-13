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

export default function PostCard({ postContent }) {
  const { header, body, footer } = postContent || {};
  const { title } = header || {};
  const { heading, description } = body || {};
  const { attachments, likes, comments } = footer || {};
  const { media } = attachments || {};
  const { likeCount } = likes || {};
  const { commentCount } = comments || {};

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>{title?.split("has")?.[1]}</div>

      <div className={styles.postBodyContainer}>
        {heading ? <div className={styles.heading}>{heading}</div> : null}

        {media?.length > 0 ? (
          <div className={styles.mediaContainer}>
            {media?.[0]?.type === IMAGE ? (
              <Image
                fill
                alt=""
                src={media?.[0]?.url?.default}
                style={{ objectFit: "contain" }}
              />
            ) : media?.[0]?.type === VIDEO ? (
              <ReactPlayer
                loop
                playing
                url={media?.[0]?.url?.default}
                height="100%"
                width="100%"
                style={{ position: "absolute", top: 0 }}
              />
            ) : media?.[0]?.type === YT_VIDEO ? (
              <YouTube
                videoId={media?.[0]?.content_id}
                className={styles.ytContainer}
                iframeClassName={styles.ytIframe}
              />
            ) : media?.[0]?.type === PDF_FILE ? (
              <Link
                download={media?.[0]?.url?.default}
                target="_blank"
                rel="noopener noreferrer"
                href={media?.[0]?.url?.default}
                style={{ width: "100%", height: "100%" }}
              >
                {media?.[0]?.thumbnail?.source ? (
                  <Image
                    fill
                    alt=""
                    src={media?.[0]?.thumbnail?.source}
                    style={{ objectFit: "contain" }}
                  />
                ) : null}
              </Link>
            ) : null}
          </div>
        ) : (
          <div className={styles.description}>{description}</div>
        )}
      </div>

      <div className={styles.postFooter}>
        <p>{likeCount}</p>
        <p>{commentCount}</p>
      </div>
    </div>
  );
}
