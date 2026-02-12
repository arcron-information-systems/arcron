"use client";

import React, { CSSProperties, useEffect, useState } from "react";

type LottieProps = {
  animationData: object;
  loop?: boolean;
  className?: string;
  style?: CSSProperties;
};

const ClientLottie = ({ animationData, loop = false, className, style }: LottieProps) => {
  const [LottieComponent, setLottieComponent] = useState<React.ComponentType<any> | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;
    import("lottie-react").then((mod) => {
      if (isMounted) {
        setLottieComponent(() => mod.default);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!LottieComponent) {
    return <div className={className} style={style} aria-hidden />;
  }

  return (
    <LottieComponent
      animationData={animationData}
      loop={loop}
      className={className}
      style={style}
    />
  );
};

export default ClientLottie;
