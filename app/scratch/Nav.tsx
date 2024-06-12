import { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../store/context";
import Lottie from "lottie-react";
import CloseLottie from "../../public/lotties/scratchClose.json";

const NavBar = () => {
  const { state, dispatch } = useContext(StoreContext);
  const lottieRef = useRef(null);

  return (
    <>
      <div className="h-[60px] flex items-center justify-end">
        <div className="rounded-full bg-red-500 h-8 w-8 relative">
          {state.play ? (
            <Lottie
              lottieRef={lottieRef}
              className="right-0 top-[2px] right-[64px] fixed h-screen z-[100]"
              loop={false}
              onComplete={() => {
                lottieRef.current.goToAndStop(0);
                dispatch({ type: "RESET" });
              }}
              autoplay
              animationData={CloseLottie}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default NavBar;
