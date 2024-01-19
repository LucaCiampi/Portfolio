"use client";

import ExternalLinkSocial from "@/components/ExternalLinkSocial";
import Lottie from "lottie-react";
import Cheers from "public/lotties/cheers.json";
import { useRef } from "react";

export default function ContactSection() {
  const lottieRef = useRef(null);

  function handleLottiePlayButtonClick(): void {
    if (lottieRef.current) {
      (lottieRef.current as Animation).play();
    }
  }

  return (
    <div>
      <div className="w-96">
        <Lottie
          autoplay={false}
          loop={false}
          lottieRef={lottieRef}
          animationData={Cheers}
        />
      </div>
      <div>
        <ExternalLinkSocial
          className="icon"
          name={"github"}
          href={"https://github.com/LucaCiampi"}
        />
        <ExternalLinkSocial
          className="icon"
          name={"linkedin"}
          href={"https://linkedin.com/in/lucaciampi"}
        />
        <button onClick={handleLottiePlayButtonClick}>PLAY LOTTIE</button>
      </div>
    </div>
  );
}
