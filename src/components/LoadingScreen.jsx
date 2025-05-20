import Lottie from "lottie-react";
import loadingAnimation from "../assets/loadingAnimation.json";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center min-h-screen">
        <Lottie
          animationData={loadingAnimation}
          loop
          className="w-24 h-24 md:w-24 md:h-24"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
