import Head from "next/head";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import React from "react";

type MetaProps = {
  title?: string;
  description?: string;
  canonical?: string;
  metaImage?: any;
};

const Meta: React.FC<MetaProps> = (props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
          key="viewport"
        />

        <title>Next Holiday Memory</title>

        <meta
          name="description"
          content="Memory Card Game Built With Next.js"
        />

        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />

        {/* <link
          rel="apple-touch-icon"
          sizes="152x152"
          href={`${router.basePath}/apple-touch-icon-152x152.png`}
          key="apple"
        />

        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href={`${router.basePath}/apple-touch-icon-144x144.png`}
          key="apple"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon_32x32.png`}
          key="icon32"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon_16x16.png`}
          key="icon16"
        />

        <meta name="msapplication-TileColor" content="#393b39" />
        <meta
          name="msapplication-TileImage"
          content={`${router.basePath}/apple-touch-icon-144x144.png`}
        /> */}
        <meta name="theme-color" content="#393b39" />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: "Next Holiday Memory",
          description: "Memory Card Game Built With Next.js",
          url: "https://herbtorres.com/",
          locale: "en",
          site_name: "Next Holiday Memory",
          // images: [
          //   {
          //     url: `${router.basePath}/meta-og-image.png`,
          //     alt: 'Next Holiday Memory',
          //   },
          // ],
        }}
      />
    </>
  );
};

export { Meta };
