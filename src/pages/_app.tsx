import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { EB_Garamond } from "next/font/google";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
