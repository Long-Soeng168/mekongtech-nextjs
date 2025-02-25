import Image from "next/image";
import React from "react";

const MyNoImage = ({ className, iconWidth }) => {
  return (
    <div
      className={`w-full flex-col flex justify-center items-center ${className}`}
    >
      <Image
        width={400}
        height={400}
        alt="empty-box"
        src="/icons/no-image.png"
        className={iconWidth}
      />
    </div>
  );
};

export default MyNoImage;
