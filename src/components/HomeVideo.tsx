"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const HomeVideo = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="bg-white h-full p-10">
      <video
        autoPlay
        loop
        muted
        className="rounded-lg"
        onLoadedData={() => {
          console.log("loaded");
          setIsVideoLoaded(true);
        }}
      >
        <source src="/demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* {!isVideoLoaded && (
        <Skeleton className="rounded-lg w-[590px] h-[330px]" />
      )} */}
    </div>
  );
};

export default HomeVideo;
