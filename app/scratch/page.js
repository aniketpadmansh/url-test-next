"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import ScratchCardOverlay from "./ScratchCardOverlay";
import ScratchCard from "./ScratchCard";

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

export default function Scratch() {
  const searchParams = useSearchParams();

  const [show, setShow] = useState(Number(searchParams.get("show")));
  const [selectedCouponData, setSelectedCouponData] = useState({
    cardText: "if user comes directly set this",
  });

  const handleSelectCoupon = (data) => {
    setSelectedCouponData(data);
  };

  return (
    <Suspense>
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

      <ScratchCardOverlay
        show={show}
        setShow={setShow}
        couponData={selectedCouponData}
      />
    </Suspense>
  );
}
