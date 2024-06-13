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
  const { stock_meta: stockMeta, status } = tradeContent || {};
  const { image_url, identifier, name } = stockMeta || {};
  const { text_prefix, color, type, percentage, text_suffix } =
    profiltLeft || {};

  return (
    <div className={styles.tradeViewCardContainer}>
      <div className={styles.midContainer}>
        <Image
          height={36}
          width={36}
          className={styles.stockItemImage}
          src={image_url}
          alt={identifier}
        />

        <div className={styles.midCell}>
          <p className={`${styles.textWhite} ${styles.textBold}`}>{name}</p>
          <p
            className={`${styles.textGray} ${styles.textMedium} ${styles.text12}`}
          >
            {identifier}
          </p>
        </div>

        {status === ACTIVE ? (
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
          {text_prefix ? (
            <span className={`${styles.textWhite} ${styles.textSemibold}`}>
              {text_prefix}
            </span>
          ) : null}{" "}
          <span className={`${colorConfig?.[color]} ${styles.textBlack}`}>
            {type === NEGATIVE ? "-" : ""}
            {percentage}%
          </span>{" "}
          {text_suffix ? (
            <span className={`${styles.textWhite} ${styles.textSemibold}`}>
              {text_suffix}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default TradeCard;
