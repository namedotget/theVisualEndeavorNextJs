import classes from "../../styles/art-detail.module.css";
import Link from "next/link";
import {
  getAllImages,
  getArtistById,
  getArtworkById,
} from "../../DUMMY/dummy-backend";
import UserArtworkList from "../../components/UserArtworkList";
import { getAllFileIDs, getFileById } from "../../firebase/helpers";
import { useEffect, useState } from "react";

function ArtworkDetailPage(props) {
  const id = props.artworkId;
  const [artwork, setArtwork] = useState(null);
  useEffect(() => {
    if (id) getFileById(id).then((res) => setArtwork(res));
  });

  if (!artwork) return <div></div>;

  return (
    <div className="pgContain">
      <div className={classes.artDetailContain}>
        <h1 className={classes.artName}>{artwork.name}</h1>
        <h2 className={classes.artistName}>Created By: {artist.name}</h2>
        <img className={classes.artwork} src={artwork.src} />
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const artworkId = context.params.aid;

  //add this condition to avoid request getting kicked to [..slug]
  //   if (!artist) {
  //     return {
  //       notFound: true,
  //     };
  //   }
  return {
    props: {
      artworkId: artworkId,
    },
    revalidate: 60,
  };
}
///TELL NEXT JS WHICH PATHS TO EXPECT FROM DYNAMIC PAGE///
export async function getStaticPaths() {
  const allImages = getAllImages();

  const allImageAIDs = [
    { aid: "a1-1" },
    { aid: "a1-2" },
    { aid: "a1-3" },
    { aid: "a1-4" },
    { aid: "a2-1" },
    { aid: "a2-2" },
    { aid: "a2-3" },
    { aid: "a2-4" },
  ];
  const paths = allImageAIDs.map((img) => ({
    params: { aid: img.aid },
  }));
  return {
    paths: paths,
    fallback: false,
    //anything thats not a path will recieve a 404//
  };
}
export default ArtworkDetailPage;
