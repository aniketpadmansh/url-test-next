"use client";
import styles from "./scratch.module.scss";
import { useEffect, useRef } from "react";
import ScratchCard from "./ScratchCard";
import Lottie from "lottie-react";
import confettiLottie from "../../public/confetti.json";
import Close from "../../public/svgs/Close";

export default function ScratchCardOverlay({
  show = false,
  couponData = {},
  setShow = () => {},
}) {
  const confettiLottieRef = useRef(null);
  const timeRef = useRef(null);
  const overlayRef = useRef(null);

  const playConfetti = () => {
    confettiLottieRef?.current?.play();
    timeRef.current = setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  const handleClickOutside = (event) => {
    if (overlayRef.current && !overlayRef.current?.contains(event.target)) {
      setShow(false);
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
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
          <Lottie
            style={{ position: "absolute" }}
            autoplay={false}
            loop={false}
            lottieRef={confettiLottieRef}
            animationData={confettiLottie}
          />

          <ScratchCard
            animate={true}
            setShow={setShow}
            playConfetti={playConfetti}
            couponData={couponData}
            isReveal={false}
          />
        </div>
      </div>

      <button
        onClick={() => {
          clearTimeout(timeRef.current);
          setShow(false);
        }}
        className={styles.closeIcon}
      >
        <Close />
      </button>
    </>
  ) : null;
}
