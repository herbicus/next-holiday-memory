"use client";
import Image from "next/image";
import StartButton from "./StartButton";

interface IntroScreenProps {
  progress: number;
  onStart?: () => void;
}

export default function IntroScreen({ progress, onStart }: IntroScreenProps) {

  return (
    <div className="fixed inset-0 z-50 w-full max-w-4xl mx-auto px-4 py-10 lg:grid lg:gap-4 lg:grid-cols-12 lg:pb-20 lg:pt-40">
      <div className="text-center relative z-10 mb-10 lg:col-span-5 lg:mb-0">
        <h1 className="text-3xl text-gray-600 font-bold uppercase mb-8 lg:hidden">
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
        <h1 className="hidden text-4xl text-gray-600 font-bold uppercase mb-4 lg:block">
          Happy Holidays {new Date().getFullYear()}
        </h1>

        <p className="text-gray-500 font-semibold text-xl lg:text-2xl">
          The holidays are about creating special memories, so how about a game
          to test just that... Good luck!
        </p>

        <div className="w-full max-w-md px-8 mx-auto relative z-10 flex flex-col justify-center">
          <StartButton progress={progress} onClick={onStart || (() => {})} />
        </div>
      </div>
    </div>
  );
}
