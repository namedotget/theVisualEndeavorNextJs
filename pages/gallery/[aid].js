import classes from "../../styles/art-detail.module.css";
import Link from "next/link";
import {
  getAllImages,
  getArtistById,
  getArtworkById,
} from "../../DUMMY/dummy-backend";
import UserArtworkList from "../../components/UserArtworkList";

function ArtworkDetailPage(props) {
  const artwork = props.selectedArtwork;
  const artist = props.selectedArtist;
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
  const artwork = getArtworkById(artworkId);
  const [artist] = getArtistById(artworkId.slice(0, 2));

  //add this condition to avoid request getting kicked to [..slug]
  //   if (!artist) {
  //     return {
  //       notFound: true,
  //     };
  //   }
  return {
    props: {
      selectedArtwork: artwork,
      selectedArtist: artist,
    },
    revalidate: 60,
  };
}
///TELL NEXT JS WHICH PATHS TO EXPECT FROM DYNAMIC PAGE///
export async function getStaticPaths() {
  const allImages = getAllImages();

  const paths = allImages.map((img) => ({
    params: { aid: img.aid },
  }));
  return {
    paths: paths,
    fallback: false,
    //anything thats not a path will recieve a 404//
  };
}
export default ArtworkDetailPage;
