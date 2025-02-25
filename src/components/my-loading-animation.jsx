"use client";
import Lottie from "lottie-react";
import animationData from "@/animations/loading-animation2.json";
export default function MyLoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Lottie
        animationData={animationData}
        className="flex items-center justify-center"
        loop={true}
      />
    </div>
  );
}
