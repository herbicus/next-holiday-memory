import '@/app/globals.css';

import type { Metadata } from "next";

import { GameProvider } from "@/context/GameContext";

// import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';

import type { AppProps } from 'next/app';

const HerbTorresPortfolio = ({ Component, pageProps }: AppProps) => (
  <GameProvider>
    <Component {...pageProps} />
  </GameProvider>
);

export default HerbTorresPortfolio;
