import classes from "../../styles/art-detail.module.css";
import { useEffect, useState } from "react";

function ArtworkDetailPage(props) {
  const id = props.artworkId;
  const { allFiles } = props;
  const [artwork, setArtwork] = useState(null);
  useEffect(() => {
    if (allFiles[1] && id)
      setArtwork(...allFiles.filter((file) => file.id === id));
  }, [id, allFiles]);

  if (!artwork) return <div></div>;

  return (
    <div className="pgContain">
      <div className={classes.artDetailContain}>
        <h1 className={classes.artName}>{artwork.name}</h1>
        <h2 className={classes.artistName}>Created By: {id}</h2>
        {artwork?.type === "video" ? (
          <video className={classes.artwork} controls autoPlay>
            <source src={artwork.url} />
          </video>
        ) : (
          <img className={classes.artwork} src={artwork.url} />
        )}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const artworkId = context.params.aid;

  return {
    props: {
      artworkId: artworkId,
    },
    revalidate: 60,
  };
}
///TELL NEXT JS WHICH PATHS TO EXPECT FROM DYNAMIC PAGE///
export async function getStaticPaths() {
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
