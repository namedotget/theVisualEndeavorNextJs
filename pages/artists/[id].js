import classes from "../../styles/artist-detail.module.css";
import Link from "next/link";
import { getAllArtistData, getArtistById } from "../../DUMMY/dummy-backend";
import UserArtworkList from "../../components/UserArtworkList";

function ArtistDetailPage(props) {
  const artist = props.selectedArtist;
  console.log(artist);

  return (
    <div className="pgContain">
      <div className={classes.artistDetailContain}>
        <div className={classes.profile}>
          <img className={classes.img} src={artist.profileImg} />

          <div className={classes.info}>
            <p className={classes.name}>{artist.name}</p>
            <p className={classes.bio}>{artist.bio}</p>
            <div className={classes.socialLinks}>
              <Link href={artist.links.twitter}>
                <img className={classes.socialIcon} src="/twitter-icon.png" />
              </Link>
              <Link href={artist.links.instagram}>
                <img className={classes.socialIcon} src="/instagram-icon.png" />
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.userArtwork}>
          <UserArtworkList images={artist.artwork.images} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const artistId = context.params.id;

  const [artist] = getArtistById(artistId);

  //add this condition to avoid request getting kicked to [..slug]
  //   if (!artist) {
  //     return {
  //       notFound: true,
  //     };
  //   }
  console.log(artist);
  return {
    props: {
      selectedArtist: artist,
    },
    revalidate: 60,
  };
}
///TELL NEXT JS WHICH PATHS TO EXPECT FROM DYNAMIC PAGE///
export async function getStaticPaths() {
  const artists = getAllArtistData();

  const paths = artists.map((artist) => ({
    params: { id: artist.id },
  }));
  console.log("paths", paths);
  return {
    paths: paths,
    fallback: false,
    //anything thats not a path will recieve a 404//
  };
}
export default ArtistDetailPage;
