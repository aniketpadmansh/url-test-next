"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import ScratchCardOverlay from "./ScratchCardOverlay";
import ScratchCard from "./ScratchCard";
import Popup from "./popup";

const couponArr = [
  {
    cardText: `🎉 WOW! You've won 1 ₹300 Check your wallet to redeem it now! 💸`,
  },
  {
    cardText: `🎉 WOW! You've won 2 ₹300 Check your wallet to redeem it now! 💸`,
  },
  {
    cardText: `🎉 WOW! You've won 3 ₹300 Check your wallet to redeem it now! 💸`,
  },
  {
    cardText: `🎉 WOW! You've won 4 ₹300 Check your wallet to redeem it now! 💸`,
  },
];

const Component = () => {
  const searchParams = useSearchParams();

  const [show, setShow] = useState(
    Number(searchParams.get("show")) ? true : false
  );
  const [selectedCouponData, setSelectedCouponData] = useState({
    cardText: "if user comes directly set this",
  });

  const handleSelectCoupon = (data) => {
    setSelectedCouponData(data);
  };

  return (
    <>
      <div className="flex gap-x-8">
        {couponArr?.map((coupon, i) => (
          <ScratchCard
            key={i}
            isReveal={true}
            setShow={setShow}
            couponData={coupon}
            handleSelectCoupon={handleSelectCoupon}
          />
        ))}
      </div>

      <div className="flex w-full justify-center mt-16">
        <Popup />
      </div>

      <ScratchCardOverlay
        show={show}
        setShow={setShow}
        couponData={selectedCouponData}
      />
    </>
  );
};

export default function Scratch() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}
