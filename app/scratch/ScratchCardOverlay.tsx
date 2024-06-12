"use client";
import styles from "./scratch.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import ScratchCard from "./ScratchCard";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import confettiLottie from "../../public/lotties/confetti.json";
import Close from "../../public/svgs/Close";
import { StoreContext } from "../store/context";
import ArrowRight from "../../public/svgs/ArrowRight";

interface Card {
  cardText: string;
  id: number;
}

interface T {
  show: boolean;
  couponData: Array<Card> | Card;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCouponData: React.Dispatch<React.SetStateAction<Card | Card[]>>;
}

export default function ScratchCardOverlay({
  show = false,
  couponData,
  setShow,
  setCouponData,
}: T) {
  const multi = Array.isArray(couponData) ? true : false;

  const { dispatch } = useContext(StoreContext);

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
      closeOverlay();
      // if (timeRef.current) {
      //   clearTimeout(timeRef.current);
      // }
    }
  };

  const moveLeft = () => {
    if (activeIndex > 0) {
      setTranslateX(translateX + 208);
      setActiveIndex((index) => index - 1);
    }
  };

  const moveRight = () => {
    if (activeIndex < (couponData as Card[])?.length - 1) {
      setTranslateX(translateX - 208);
      setActiveIndex((index) => index + 1);
    }
  };

  const closeOverlay = () => {
    // clearTimeout(timeRef.current);
    dispatch({ type: "PLAY" });
    setShow(false);
  };

  const updateCoupons = (index: number) => {
    const remaining = JSON.parse(JSON.stringify(couponData));
    remaining?.splice(index, 1);

    if (remaining?.length > 0) {
      setCouponData(remaining);
    } else {
      setShow(false);
    }

    // if (activeIndex === 0) {
    //   moveRight();
    // } else
    if (activeIndex === (couponData as Card[])?.length - 1) {
      moveLeft();
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
                onClick={moveLeft}
                className={`${styles.arrowContainer} ${styles.arrowLeft}`}
              >
                <ArrowRight />
              </div>

              <div className={styles.slideContainer}>
                <div
                  className={styles.slide}
                  style={{
                    transform: `translateX(${translateX}px)`,
                  }}
                >
                  {(couponData as Card[])?.map((coupon: Card, i: number) => (
                    <div
                      key={coupon.id}
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
                        multi={multi}
                        updateCoupons={() => {
                          updateCoupons(i);
                        }}
                        isReveal={false}
                        showText={false}
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
                onClick={moveRight}
                className={`${styles.arrowContainer} ${styles.arrowRight}`}
              >
                <ArrowRight />
              </div>

              <button onClick={closeOverlay} className={styles.purpleClose}>
                <Close height={24} width={24} stroke="#fff" />
              </button>
            </div>
          ) : (
            <ScratchCard
              animate={true}
              setShow={setShow}
              playConfetti={playConfetti}
              couponData={couponData as Card}
              isReveal={false}
            />
          )}
        </div>
      </div>

      {multi ? null : (
        <button onClick={closeOverlay} className={styles.closeIcon}>
          <Close />
        </button>
      )}
    </>
  ) : null;
}
