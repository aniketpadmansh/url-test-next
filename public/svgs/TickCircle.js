import * as React from "react";
const TickCircle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    {...props}
  >
    <circle cx={22} cy={22} r={20.5} stroke="#fff" strokeWidth={3} />
    <path
      fill="#fff"
      stroke="#fff"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="m19.58 26.365-6.236-6.236a.25.25 0 0 0-.345-.008l-1.33 1.21a.25.25 0 0 0-.01.362l6.414 6.413 1.33 1.33a.25.25 0 0 0 .354 0l12.826-12.825a.25.25 0 0 0 0-.354l-1.33-1.33a.25.25 0 0 0-.355 0L19.58 26.365Z"
    />
  </svg>
);
export default TickCircle;
