import Head from "next/head";
import { useRouter } from "next/router";
import { useHistory } from "react-router-dom";
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
        <title>the visual endeavor</title>
        <meta
          name="description"
          content="~~~ a three-dimensional art gallery ~~~"
        />
        <meta name="image" content="./icons/tve-icon.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoomPreview onClick={handleRoomPreviewBtn} />
    </div>
  );
}
