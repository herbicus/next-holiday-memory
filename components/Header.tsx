import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <div className="flex w-full max-w-[1120px] mx-auto px-4 justify-around items-center gap-2 mt-2 mb-6 lg:gap-4">
      {/* Left side lines */}
      <div className="flex flex-col w-full items-end gap-1">
        {/* Short line - top */}
        <div className="h-0.5 bg-[#C00000]" style={{ width: "50%" }} />
        {/* Long line - middle */}
        <div className="h-0.5 bg-[#f88474]" style={{ width: "60%" }} />
        {/* Short line - bottom */}
        <div className="h-0.5 bg-[#C00000]" style={{ width: "50%" }} />
      </div>

      {/* Center content */}
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="https://artifactdesign.com/"
          className="cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Artifact Design"
        >
          <span className="sr-only">Artifact Design</span>
          <Image
            src="/img/artifact-full-logo-red.png"
            width={1399}
            height={146}
            className="w-full h-auto max-w-24 lg:max-w-36"
            alt="Artifact Design Logo"
            priority
          />
        </a>

        <span className="inline-block font-light text-[#f88474] text-2xl">
          |
        </span>

        <h1 className="text-sm tracking-widest font-medium uppercase text-[#C00000] sm:text-base lg:text-xl">
          Holiday memory game
        </h1>
      </div>

      {/* Right side lines */}
      <div className="flex flex-col w-full items-start gap-1">
        {/* Short line - top */}
        <div className="h-0.5 bg-[#C00000]" style={{ width: "50%" }} />
        {/* Long line - middle */}
        <div className="h-0.5 bg-[#f88474]" style={{ width: "60%" }} />
        {/* Short line - bottom */}
        <div className="h-0.5 bg-[#C00000]" style={{ width: "50%" }} />
      </div>
    </div>
  );
};

export default Header;
