"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface StartButtonProps {
  progress: number;
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ progress, onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);

  const isReady = progress >= 100;

  // Animate progress bar width
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

  // Animate transition from progress to button text when ready
  useGSAP(
    () => {
      if (isReady && progressTextRef.current && buttonTextRef.current) {
        // Fade out progress text
        gsap.to(progressTextRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        // Fade in button text after a short delay
        gsap.to(buttonTextRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.2,
        });

        // Animate progress bar to full width and fade out
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.1,
          });
        }
      }
    },
    { dependencies: [isReady] }
  );

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={!isReady}
      className={`w-full px-8 py-2 bg-[#f95257] text-white text-lg font-semibold rounded-full shadow-2xl relative overflow-hidden transition-all ${
        isReady
          ? "hover:bg-red-700 cursor-pointer"
          : "cursor-not-allowed opacity-90"
      }`}
    >
      {/* Progress bar - shown while loading */}
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="w-full max-w-[80%] h-4 bg-white/30 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-white rounded-full transition-all"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      )}

      {/* Button text - always rendered, fades in when ready */}
      <span
        ref={buttonTextRef}
        className="relative z-10 uppercase inline-block"
        style={{ opacity: isReady ? 1 : 0 }}
      >
        Start Game
      </span>
    </button>
  );
};

export default StartButton;
