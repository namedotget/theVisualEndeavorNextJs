import Head from "next/head";
import { useRouter } from "next/router";

import classes from "../styles/home-page.module.css";

import RoomPreview from "../components/RoomPreview";

export default function HomePage() {
  const router = useRouter();

  const handleRoomPreviewBtn = function () {
    router.push("/room");
  };

  return (
    <div className={classes.container}>
      <Head>
        <title>the Visual Endeavor</title>
        <meta name="description" content="test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes.main}>
        <RoomPreview onClick={handleRoomPreviewBtn} />
      </main>
    </div>
  );
}
