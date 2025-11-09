"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

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

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [progress]);

  // Animate transition from progress bar to button when loading is complete
  useEffect(() => {
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
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
    >
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-5xl font-bold mb-4">Holiday Memory Game</h1>
        <p className="text-xl ">Loading amazing content...</p>
      </div>

      <div className="w-full max-w-md px-8 relative z-10 min-h-[120px] flex flex-col justify-center">
        {/* Progress bar - always rendered, fades out when loaded */}
        <div
          ref={progressContainerRef}
          className={isLoaded ? "absolute w-full px-8 pointer-events-none left-0" : ""}
        >
          <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-linear-to-r from-red-600 via-white to-green-600 rounded-full"
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
          className={`w-full px-8 py-4 bg-white text-black text-xl font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-2xl ${
            !isLoaded ? "absolute opacity-0 pointer-events-none" : ""
          }`}
          style={{ opacity: 0 }}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
