import type { AppProps } from "next/app";
import { EB_Garamond } from "next/font/google";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"], // you can include other weights too
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
