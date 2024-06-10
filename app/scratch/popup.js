import TickCircle from "@/public/svgs/tickCircle";
import styles from "./scratch.module.scss";
import Copy from "../../public/svgs/Copy";
import Ruppee from "../../public/svgs/Ruppee";
import Share from "../../public/svgs/Share";
import Success from "../../public/svgs/Success";

export default function Popup() {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.centerImage}>
        <Success />
      </div>

      <div className={styles.share}>
        <Share />
      </div>

      <div className={styles.textContainer}>
        <p className={styles.status}>SUCCESS</p>
        <p className={styles.points}>+10</p>
        <div className={styles.tickCtr}>
          <TickCircle />
        </div>
        <p className={styles.text1}>Cashback from scratch card</p>
        <p className={styles.date}>09 September 2023 at 11:47 AM</p>
        <p className={styles.transactionStatus}>
          Your transaction is successful.
        </p>
        <p className={styles.text2}>Transaction ID:</p>
        <p className={styles.id}>
          7ac675567-1f46-484a-gj46y-18e9765bed{" "}
          <span>
            <Copy />
          </span>
        </p>
        <div className={styles.text3Container}>
          Credited to Deposit{" "}
          <div>
            <Ruppee /> 10
          </div>
        </div>
      </div>
    </div>
  );
}
