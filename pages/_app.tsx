import LayoutComponent from "@/components/Layout/LayoutComponent";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";


const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutComponent>
     
      <div className={rubik.className}>
        <Component {...pageProps} />
      </div>
    </LayoutComponent>
  );
}
