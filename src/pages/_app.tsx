import { Flowbite, Spinner } from "flowbite-react";
import { AppProps } from "next/app";
import { Suspense } from "react";
import "../styles/globals.css";
import { flowbiteTheme as theme } from "../theme";
import Head from "next/head";
import Header from "../components/header";
import ActualSidebar from "../components/actual-sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import Footer from "../components/footer";
import { appWithTranslation } from 'next-i18next';

const App = ({ Component, pageProps }: AppProps) => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center">
        <Spinner size="lg" /> Loading..
      </div>
    }
  >
    <Flowbite theme={{ theme }}>
      <Head>
        <title>Bitcoin Nano Cryptocurrency</title>
        <meta name="description" content="Eco-Friendly Without relying on mining, printing or minting. and powering Artificial Intelligence for everyone" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SidebarProvider>
        <Header {...pageProps} />
        <div className="flex dark:bg-gray-900">
          <main className="order-2 mx-4 mt-4 mb-4 flex-[1_0_16rem]">
            <Component {...pageProps} />
          </main>
          <div className="order-1">
            <ActualSidebar {...pageProps} />
          </div>
        </div>
      </SidebarProvider>
      <Footer />
    </Flowbite>
  </Suspense>
)

// https://github.com/i18next/next-i18next#unserialisable-configs
export default appWithTranslation(App/*, nextI18NextConfig */)