import Layout from "../components/layouts/Layout";
import "../styles/globals.css";
import { useRouter } from "next/router";
import LoadingScreen from "../components/LoadingScreen";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <Layout>
      <LoadingScreen loading={loading} />
      {!loading ? <Component {...pageProps} /> : <div></div>}
    </Layout>
  );
}

export default MyApp;
