"use client";
import { useRef, useEffect, useState } from "react";
import walkForward from "../../public/lotties/walking_man_forward.json";
import walkBackward from "../../public/lotties/walking_man_backward.json";
import stopForward from "../../public/lotties/stop_man_forward.json";
import stopBackward from "../../public/lotties/stop_man_backward.json";
import Lottie from "lottie-react";

const walkingLottie = {
  FORWARD: walkForward,
  BACKWARD: walkBackward,
};

const stoppedLottie = {
  FORWARD: stopForward,
  BACKWARD: stopBackward,
};

const entry_position = 24.59;
const indicator_position = 65.45454545454545;
const is_negative_trade = false;

const SPEED = 120; // pixel per second
const HALF_MAN_WIDTH = 44 / 2;

const Move = () => {
  const outerRef = useRef(null);
  const manRef = useRef(null);

  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(0);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (outerRef.current) {
      const normalized_entry_position =
        (entry_position * outerRef.current.offsetWidth) / 100;
      const normalized_indicator_position =
        (indicator_position * outerRef.current.offsetWidth) / 100;

      setStartPoint((entry_position * outerRef.current.offsetWidth) / 100);
      setEndPoint((indicator_position * outerRef.current.offsetWidth) / 100);

      if (manRef.current) {
        manRef.current.style.transform = `translateX(${
          normalized_indicator_position -
          normalized_entry_position -
          HALF_MAN_WIDTH
        }px)`;

        manRef.current.style.transition = `transform ${
          Math.abs(normalized_indicator_position - normalized_entry_position) /
          SPEED
        }s ease-in-out`;
      }

      setTimeout(() => {
        setEnded(true);
      }, (Math.abs(normalized_indicator_position - normalized_entry_position) / SPEED) * 1000);
    }
  }, []);

  return (
    <div ref={outerRef} className="max-w-[1000px] relative">
      <div
        ref={manRef}
        className={`w-[44px] absolute translate-x-[-50%]`}
        style={{ left: startPoint }}
      >
        {ended ? (
          <Lottie
            loop={false}
            autoplay
            animationData={
              is_negative_trade
                ? stoppedLottie?.BACKWARD
                : stoppedLottie?.FORWARD
            }
          />
        ) : (
          <Lottie
            loop
            autoplay
            animationData={
              is_negative_trade
                ? walkingLottie?.BACKWARD
                : walkingLottie?.FORWARD
            }
          />
        )}
      </div>

      <div
        className="bg-red-500 absolute h-2 w-2 rounded-full mt-[50px] translate-x-[-50%]"
        style={{ left: startPoint }}
      />
      <div
        className="bg-red-500 absolute h-2 w-2 rounded-full mt-[50px] translate-x-[-50%]"
        style={{ left: endPoint }}
      />
    </div>
  );
};

export default Move;
