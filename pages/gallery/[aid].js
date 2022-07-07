import classes from "../../styles/artist-detail.module.css";
import Link from "next/link";
import {
  getAllArtistData,
  getAllImages,
  getArtworkById,
} from "../../DUMMY/dummy-backend";
import UserArtworkList from "../../components/UserArtworkList";

function ArtworkDetailPage(props) {
  const artwork = props.selectedArtwork;

  return <div className="pgContain"></div>;
}

export async function getStaticProps(context) {
  const artworkId = context.params.aid;

  const artwork = getArtworkById(artworkId);
  console.log("ARTWORK", artwork);

  //add this condition to avoid request getting kicked to [..slug]
  //   if (!artist) {
  //     return {
  //       notFound: true,
  //     };
  //   }
  return {
    props: {
      selectedArtwork: artwork,
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
