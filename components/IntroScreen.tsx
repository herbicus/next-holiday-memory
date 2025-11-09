"use client";
import Image from "next/image";

import Header from "./Header";
import StartButton from "./StartButton";

interface IntroScreenProps {
  progress: number;
  onStart?: () => void;
}

export default function IntroScreen({ progress, onStart }: IntroScreenProps) {
  return (
    <div className="fixed inset-0 z-50 w-full max-w-4xl mx-auto px-4 pb-10 pt-4 lg:grid lg:gap-4 lg:grid-cols-12 lg:pb-20">
      <div className="lg:col-span-full mb-10">
        <Header />
      </div>

      <div className="text-center relative z-10 mb-10 lg:col-span-7 lg:mb-0">
        <Image
          src="/img/gamebox.png"
          alt="Game Box"
          width={504}
          height={476}
          className="w-full h-auto object-contain max-lg:max-w-96 max-lg:mx-auto"
        />
      </div>

      <div className="block space-y-10 text-center lg:col-span-5">
        {/* <h1 className="hidden text-4xl text-neutral-500 font-bold uppercase mb-4 lg:block">
          Happy Holidays {new Date().getFullYear()}
        </h1> */}

        <p className="text-neutral-600 font-medium text-xl sm:text-2xl lg:min-w-lg relative lg:left-1/2 lg:-translate-x-1/2 lg:mt-10">
          The holidays are about creating special memories, so how about a game
          to test just that... Good luck!
        </p>

        <div className="w-full max-w-72 mx-auto relative z-10 flex flex-col justify-center">
          <StartButton progress={progress} onClick={onStart || (() => {})} />
        </div>

        <div className="flex justify-end w-full">
          <Image
            src="/img/artifact-full-logo-red.png"
            alt="Artifact Design"
            width={1399}
            height={146}
            className="w-full h-auto max-w-36"
          />
        </div>
      </div>
    </div>
  );
}
