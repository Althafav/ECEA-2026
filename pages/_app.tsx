import LayoutComponent from "@/components/Layout/LayoutComponent";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  useEffect(() => {
    if (locale) {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale.startsWith("ar") ? "rtl" : "ltr";
    }
  }, [locale]);
  return (
    <LayoutComponent>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={rubik.className}>
        <Component {...pageProps} />
      </div>
    </LayoutComponent>
  );
}
