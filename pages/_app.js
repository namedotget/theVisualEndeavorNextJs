import Layout from "../components/layouts/Layout";
import "../styles/globals.css";
import { useRouter } from "next/router";
import LoadingScreen from "../components/LoadingScreen";
import { useState, useEffect } from "react";
import { getAllData, getAllFiles } from "../firebase/helpers";
import { ModalContextProvider } from "../components/ui/modal-context";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  //DATA FETHCING
  useEffect(() => {
    if (!allData[1]) getAllData().then((res) => setAllData(res));

    if (!allFiles[0])
      getAllFiles().then((res) => {
        res.forEach((user) => {
          user.then((data) => {
            setAllFiles((prev) => [
              ...prev,
              ...data.filter((data) => data?.url),
            ]);
          });
        });
      });
  }, []);

  return (
    <ModalContextProvider>
      <Layout>
        <LoadingScreen loading={loading} />
        {!loading ? (
          <Component allFiles={allFiles} allData={allData} {...pageProps} />
        ) : (
          <div></div>
        )}
      </Layout>
    </ModalContextProvider>
  );
}

export default MyApp;
