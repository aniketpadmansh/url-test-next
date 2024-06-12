import * as React from "react";
const ArrowRight = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <circle cx={12} cy={12} r={12} fill="#6046CF" />
    <path
      fill="#fff"
      fillRule="evenodd"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.238 6.164c-.388.26-.451.731-.14 1.055l4.35 4.531-4.35 4.532c-.311.323-.248.795.14 1.054.388.258.954.206 1.265-.117l4.8-5a.655.655 0 0 0 0-.938l-4.8-5c-.31-.323-.877-.375-1.265-.117Z"
      clipRule="evenodd"
    />
  </svg>
);
export default ArrowRight;
