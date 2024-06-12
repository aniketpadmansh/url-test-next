"use client";
import styles from "./scratch.module.scss";
import { useEffect, useRef, useState } from "react";
import ScratchCard from "./ScratchCard";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import confettiLottie from "../../public/lotties/confetti.json";
import Close from "../../public/svgs/Close";

interface Card {
  cardText: string;
}

interface T {
  show: boolean;
  couponData: Array<Card> | Card;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ScratchCardOverlay({
  show = false,
  couponData,
  setShow,
}: T) {
  const multi = Array.isArray(couponData) ? true : false;

  // const timeRef = useRef(null);
  const confettiLottieRef = useRef<LottieRefCurrentProps | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(188);

  const playConfetti = () => {
    confettiLottieRef?.current?.play();
    // timeRef.current = setTimeout(() => {
    //   setShow(false);
    // }, 3000);
  };

  const handleClickOutside = (event) => {
    if (
      overlayRef.current &&
      !overlayRef.current?.contains(event.target as Node)
    ) {
      setShow(false);
      // if (timeRef.current) {
      //   clearTimeout(timeRef.current);
      // }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return show ? (
    <>
      <div className={styles.blackGradient}>
        <div ref={overlayRef}>
          {multi ? null : (
            <Lottie
              style={{ position: "absolute" }}
              autoplay={false}
              loop={false}
              lottieRef={confettiLottieRef}
              animationData={confettiLottie}
            />
          )}

          {multi ? (
            <div className={styles.sliderContainer}>
              <Lottie
                style={{
                  position: "absolute",
                  width: "100%",
                  left: 0,
                  right: 0,
                }}
                autoplay={false}
                loop={false}
                lottieRef={confettiLottieRef}
                animationData={confettiLottie}
                onComplete={() => {
                  confettiLottieRef.current.goToAndStop(0);
                }}
              />

              <div
                onClick={() => {
                  if (activeIndex > 0) {
                    setTranslateX(translateX + 208);
                    setActiveIndex((index) => index - 1);
                  }
                }}
                className={`${styles.arrowContainer} ${styles.arrowLeft}`}
              />

              <div className={styles.slideContainer}>
                <div
                  className={styles.slide}
                  style={{
                    transform: `translateX(${translateX}px)`,
                  }}
                >
                  {(couponData as Card[])?.map((coupon: Card, i: number) => (
                    <div
                      key={i}
                      style={
                        activeIndex === i
                          ? { transition: `all 0.5s ease-in-out` }
                          : {
                              transform: `scale(0.8)`,
                              transition: `all 0.5s ease-in-out`,
                            }
                      }
                    >
                      <ScratchCard
                        isReveal={false}
                        showText={false}
                        // multi={multi}
                        setShow={setShow}
                        playConfetti={playConfetti}
                        couponData={coupon}
                      />
                    </div>
                  ))}
                </div>

                <div className={`${styles.gradLeft} ${styles.gradBlock}`} />
                <div className={`${styles.gradRight} ${styles.gradBlock}`} />

                <div>
                  <h3>Congratulations!</h3>
                  <p>You got a new scratch card</p>
                </div>
              </div>

              <div
                onClick={() => {
                  if (activeIndex < (couponData as Card[])?.length - 1) {
                    setTranslateX(translateX - 208);
                    setActiveIndex((index) => index + 1);
                  }
                }}
                className={`${styles.arrowContainer} ${styles.arrowRight}`}
              />

              <button
                onClick={() => {
                  // clearTimeout(timeRef.current);
                  setShow(false);
                }}
                className={styles.purpleClose}
              >
                <Close height={24} width={24} stroke="#fff" />
              </button>
            </div>
          ) : (
            <ScratchCard
              animate={true}
              setShow={setShow}
              // multi={multi}
              playConfetti={playConfetti}
              couponData={couponData as Card}
              isReveal={false}
            />
          )}
        </div>
      </div>

      {multi ? null : (
        <button
          onClick={() => {
            // clearTimeout(timeRef.current);
            setShow(false);
          }}
          className={styles.closeIcon}
        >
          <Close />
        </button>
      )}
    </>
  ) : null;
}
