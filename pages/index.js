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
    <div className="pgContain">
      <Head>
        <title>the Visual Endeavor</title>
        <meta name="description" content="test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoomPreview onClick={handleRoomPreviewBtn} />
    </div>
  );
}
