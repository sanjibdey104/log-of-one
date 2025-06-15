import type { AppProps } from "next/app";
import { EB_Garamond } from "next/font/google";
import "@/styles/globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={ebGaramond.className}>
      <Component {...pageProps} />;
    </main>
  );
}
