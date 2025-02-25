import Image from "next/image";
import React from "react";

const MyNoDataIcon = () => {
  return (
    <div className="w-full h-full flex-col flex justify-center items-center py-4">
      <Image
        width={600}
        height={600}
        alt="empty-box"
        src="/icons/empty.png"
        className="w-20"
      />
      <p className="text-foreground text-lg">No Data</p>
    </div>
  );
};

export default MyNoDataIcon;
