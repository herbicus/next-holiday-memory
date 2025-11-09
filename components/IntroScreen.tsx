"use client";
import Image from "next/image";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface IntroScreenProps {
  progress: number;
  onStart?: () => void;
}

export default function IntroScreen({ progress, onStart }: IntroScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isLoaded = progress >= 100;

  useGSAP(
    () => {
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          width: `${progress}%`,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    { dependencies: [progress] }
  );

  // Animate transition from progress bar to button when loading is complete
  useGSAP(
    () => {
      if (isLoaded && buttonRef.current && progressContainerRef.current) {
        // Fade out progress bar
        gsap.to(progressContainerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        // Fade in button after a short delay
        gsap.to(buttonRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.3,
        });
      }
    },
    { dependencies: [isLoaded] }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 w-full max-w-4xl mx-auto px-4 py-10 lg:grid lg:gap-4 lg:grid-cols-12 lg:pb-20 lg:pt-40"
    >
      <div className="text-center relative z-10 mb-10 lg:col-span-5 lg:mb-0">
        <h1 className="text-3xl text-gray-600 font-bold mb-8 lg:hidden">
          Happy Holidays {new Date().getFullYear()}
        </h1>

        <Image
          src="/img/gamebox.png"
          alt="Game Box"
          width={504}
          height={476}
          className="w-full h-auto object-contain max-lg:max-w-96 max-lg:mx-auto"
        />
      </div>

      <div className="block space-y-4 text-center lg:col-span-7">
        <h1 className="hidden text-4xl text-gray-600 font-bold mb-4 lg:block">
          Happy Holidays {new Date().getFullYear()}
        </h1>

        <p className="text-gray-500 font-semibold text-xl lg:text-2xl">
          The holidays are about creating special memories, so how about a game
          to test just that... Good luck!
        </p>

        <div className="w-full max-w-md px-8 mx-auto relative z-10 min-h-[120px] flex flex-col justify-center">
          {/* Progress bar - always rendered, fades out when loaded */}
          <div
            ref={progressContainerRef}
            className={
              isLoaded ? "absolute w-full px-8 pointer-events-none left-0" : ""
            }
          >
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-linear-to-r from-[#fe7276] via-[#fffec0] to-[#ceffe4]  rounded-full"
                style={{ width: "0%" }}
              />
            </div>
            <p className="text-center text-gray-300 mt-4 text-sm">
              {Math.round(progress)}%
            </p>
          </div>

          {/* Button - always rendered, fades in when loaded */}
          <button
            ref={buttonRef}
            onClick={onStart}
            className={`w-full px-8 py-2 bg-[#f95257] text-white text-lg font-semibold rounded-full hover:bg-red-700 cursor-pointer transition-colors shadow-2xl ${
              !isLoaded ? "absolute opacity-0 pointer-events-none" : ""
            }`}
            style={{ opacity: 0 }}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
