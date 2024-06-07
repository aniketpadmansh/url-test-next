import Image from "next/image";
import styles from "./scratch.module.scss";
import scratchLottie from "../../public/scratch.json";
import coinLottie from "../../public/coin.json";
import Lottie from "lottie-react";
import { useRef, useState } from "react";

export default function ScratchCard({
  couponData,
  isReveal = true,
  playConfetti = () => {},
  setShow = () => {},
  handleSelectCoupon = () => {},
}) {
  const scratchLottieRef = useRef(null);

  const [isScratched, setIsScratched] = useState(false);

  const scratchTheCard = () => {
    if (isReveal) {
      handleSelectCoupon(couponData);
      setShow(true);
      return;
    }

    scratchLottieRef?.current?.play();
  };

  return (
    <>
      <div
        onClick={scratchTheCard}
        className={`${styles.scratchCardContainer} ${
          isReveal ? styles.borderCurve : ""
        }`}
      >
        {isScratched ? (
          <div className={styles.scratchedBody}>
            <div className={styles.coinLottie}>
              <Lottie animationData={coinLottie} autoplay loop />
            </div>

            <p>{couponData?.cardText}</p>
          </div>
        ) : (
          <>
            {isReveal ? null : (
              <Lottie
                style={{ position: "absolute", width: "100%", height: "100%" }}
                lottieRef={scratchLottieRef}
                autoplay={false}
                loop={false}
                onComplete={() => {
                  setIsScratched(true);
                  playConfetti();
                }}
                animationData={scratchLottie}
              />
            )}

            {isReveal ? (
              <div className={styles.expiryContainer}>
                <p>2 months left</p>
              </div>
            ) : null}

            <div className={styles.gift}>
              <Image
                src="/gift.svg"
                priority
                alt="close"
                height={52}
                width={59}
              />
            </div>

            <div className={styles.scratchStrip}>
              <p>{isReveal ? "Reveal Now" : "Scratch Here"}</p>
            </div>
          </>
        )}
      </div>

      {isReveal ? null : (
        <>
          <h3>Congratulations!</h3>
          <p>You got a new scratch card</p>
        </>
      )}
    </>
  );
}
