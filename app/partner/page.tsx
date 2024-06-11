"use client";
import { tradeCardData, allPosts } from "../data";
import PostCard from "./PostCard";
import TradeCard from "./TradeCard";
import styles from "./partner.module.scss";

const Partne = () => {
  return (
    <div className="bg-[#1f2127] h-screen p-4 rounded-xl">
      <p
        style={{ fontSize: 30 }}
        className={`${styles.textBold} ${styles.textWhite}`}
      >
        Trade Views
      </p>
      <div className="w-full flex mt-5">
        <TradeCard tradeContent={tradeCardData?.body?.trade_content} />
      </div>
      <p
        style={{ fontSize: 30, marginTop: 20 }}
        className={`${styles.textBold} ${styles.textWhite}`}
      >
        Posts
      </p>
      <div className="w-full flex mt-5 gap-x-4 overflow-scroll">
        {allPosts?.map((post) => (
          <PostCard key={post?.post_id} postContent={post} />
        ))}
      </div>
    </div>
  );
};

export default Partne;
