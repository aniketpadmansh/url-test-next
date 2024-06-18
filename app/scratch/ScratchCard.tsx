import styles from "./scratch.module.scss";
import scratchLottie from "../../public/lotties/scratch.json";
import coinLottie from "../../public/lotties/coin.json";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import Gift from "../../public/svgs/Gift";

interface T {
  couponData: { cardText: string };
  isReveal: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  playConfetti?: Function;
  handleSelectCoupon?: Function;
  showText?: boolean;
  multi?: boolean;
  updateCoupons?: Function;
}

export default function ScratchCard({
  animate = false,
  couponData,
  isReveal = true,
  playConfetti = () => {},
  setShow = () => {},
  handleSelectCoupon = () => {},
  showText,
  updateCoupons = () => {},
  multi = false,
}: T) {
  const scratchLottieRef = useRef(null);
  const cardRef = useRef(null);

  const [isScratched, setIsScratched] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  const scratchTheCard = () => {
    if (isReveal) {
      handleSelectCoupon(couponData);
      setShow(true);
      return;
    }

    setIsScratching(true);
    scratchLottieRef?.current?.play();
  };

  const observeCallback = function (entries) {
    const [entry] = entries;

    if (entry.isIntersecting) {
      cardRef.current.className = `${cardRef.current.className} ${styles.rotateAndGrow}`;
    }
  };

  useEffect(() => {
    if (animate) {
      const cardObserver = new IntersectionObserver(observeCallback, {});
      if (cardRef.current) cardObserver.observe(cardRef.current);

      return () => {
        if (cardRef.current) cardObserver.unobserve(cardRef.current);
      };
    }
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        onClick={scratchTheCard}
        className={`${styles.scratchCardContainer} ${
          isReveal ? styles.borderCurve : ""
        } ${animate ? styles.tilt : ""}`}
      >
        {isScratched ? (
          <div className={styles.scratchedBody}>
            <div className={styles.coinLottie}>
              <Lottie animationData={coinLottie} autoplay loop />
            </div>

            <p>{couponData?.cardText}</p>
          </div>
        ) : (
          <div className={styles.unscratchedBody}>
            {isReveal ? null : (
              <Lottie
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
                lottieRef={scratchLottieRef}
                autoplay={false}
                loop={false}
                onComplete={() => {
                  setIsScratched(true);
                  playConfetti();

                  setTimeout(() => {
                    updateCoupons();
                  }, 3000);
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
              <Gift />
            </div>

            {isScratching ? null : (
              <div className={styles.scratchStrip}>
                <p>{isReveal ? "Reveal Now" : "Scratch Here"}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {isReveal || !showText ? null : (
        <>
          <h3>Congratulations!</h3>
          <p>You got a new scratch card</p>
        </>
      )}
    </>
  );
}
