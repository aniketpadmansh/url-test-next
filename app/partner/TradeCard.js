import Image from "next/image";
import styles from "./partner.module.scss";
import TradeViewGraph from "./TradeViewGraph";
import PurpleDot from "./PurpleDot";

const NEGATIVE = "NEGATIVE";
const ACTIVE = "Active";

const colorConfig = {
  GREEN: styles.textGreen,
  GRAY: styles.textRed,
};

const TradeCard = ({ tradeContent }) => {
  const profiltLeft = tradeContent?.trade_sentiment?.[0];
  const stockMeta = tradeContent?.stock_meta;

  return (
    <div className={styles.tradeViewCardContainer}>
      <div className={styles.midContainer}>
        <Image
          height={36}
          width={36}
          className={styles.stockItemImage}
          src={stockMeta?.image_url}
          alt={stockMeta?.identifier}
        />

        <div className={styles.midCell}>
          <p className={`${styles.textWhite} ${styles.textBold}`}>
            {stockMeta?.name}
          </p>
          <p
            className={`${styles.textGray} ${styles.textMedium} ${styles.text12}`}
          >
            {stockMeta?.identifier}
          </p>
        </div>

        {tradeContent?.status === ACTIVE ? (
          <div
            className={`${styles.textWhite} ${styles.textSemibold} flex self-start items-center`}
          >
            <PurpleDot />
            Live
          </div>
        ) : null}
      </div>

      <TradeViewGraph stockMeta={stockMeta} />

      <div className={styles.tradeViewCardFooterContainer}>
        <p>
          {profiltLeft?.text_prefix ? (
            <span className={`${styles.textWhite} ${styles.textSemibold}`}>
              {profiltLeft?.text_prefix}
            </span>
          ) : null}{" "}
          <span
            className={`${colorConfig?.[profiltLeft?.color]} ${
              styles.textBlack
            }`}
          >
            {profiltLeft?.type === NEGATIVE ? "-" : ""}
            {profiltLeft?.percentage}%
          </span>{" "}
          {profiltLeft?.text_suffix ? (
            <span className={`${styles.textWhite} ${styles.textSemibold}`}>
              {profiltLeft?.text_suffix}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default TradeCard;
