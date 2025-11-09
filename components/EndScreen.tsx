"use client";

import Image from "next/image";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface EndScreenProps {
  onRestart?: () => void;
  visible?: boolean;
}

export default function EndScreen({
  onRestart,
  visible = false,
}: EndScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasAnimated = useRef(false);

  useGSAP(
    () => {
      if (
        visible &&
        !hasAnimated.current &&
        containerRef.current &&
        titleRef.current &&
        messageRef.current &&
        buttonRef.current
      ) {
        hasAnimated.current = true;
        const tl = gsap.timeline();

        // Animate children only, parent controls container opacity
        tl.fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "+=0.2" // Small delay after parent fade in starts
        )
          .fromTo(
            messageRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            buttonRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.3"
          );
      }
    },
    { dependencies: [visible] }
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <Image
        src="/img/outro-page-bg.png"
        width={1920}
        height={1080}
        className="w-full h-full absolute inset-0 object-cover"
        alt=""
        role="presentation"
      />
      <div className="text-center px-8 relative z-10">
        {onRestart && (
          <button
            ref={buttonRef}
            onClick={onRestart}
            className="px-8 py-4 bg-white text-black text-xl font-semibold rounded-full hover:bg-neutral-200 transition-colors shadow-2xl"
            style={{ opacity: 0 }}
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
