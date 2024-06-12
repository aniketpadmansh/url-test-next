"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ScratchCardOverlay from "./ScratchCardOverlay";
import ScratchCard from "./ScratchCard";
import Popup from "./popup";
import NavBar from "./Nav";
import { StoreProvider } from "../store/Provider";

const couponArr = [
  {
    id: 1,
    cardText: `🎉 WOW! You've won 1 ₹300 Check your wallet to redeem it now! 💸`,
  },
  {
    id: 2,
    cardText: `🎉 WOW! You've won 2 ₹300 Check your wallet to redeem it now! 💸`,
  },
  {
    id: 3,
    cardText: `🎉 WOW! You've won 3 ₹300 Check your wallet to redeem it now! 💸`,
  },
  {
    id: 4,
    cardText: `🎉 WOW! You've won 4 ₹300 Check your wallet to redeem it now! 💸`,
  },
];

interface Card {
  cardText: string;
  id: number;
}

const Component = () => {
  const searchParams = useSearchParams();

  const [show, setShow] = useState<boolean>(false);
  const [selectedCouponData, setSelectedCouponData] = useState<
    Card | Card[] | null
  >(null);

  const handleSelectCoupon = (data: Card) => {
    setSelectedCouponData(data);
  };

  useEffect(() => {
    if (Number(searchParams.get("show"))) {
      setSelectedCouponData(couponArr);
      setShow(true);
    }
  }, []);

  return (
    <>
      <NavBar />

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
        setCouponData={setSelectedCouponData}
      />
    </>
  );
};

export default function Scratch() {
  return (
    <Suspense>
      <StoreProvider>
        <Component />
      </StoreProvider>
    </Suspense>
  );
}
