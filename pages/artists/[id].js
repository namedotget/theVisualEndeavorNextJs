import classes from "../../styles/artist-detail.module.scss";
import Link from "next/link";
import {
  getAllArtistData,
  getArtistById,
  getUserInfo,
} from "../../DUMMY/dummy-backend";
import PaginatedUserArt from "../../components/UserArtworkList";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase/clientApp";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { useEffect, useState } from "react";
import { getArtistData, getArtistFiles } from "../../firebase/helpers";

function ArtistDetailPage(props) {
  const artist = props.selectedArtist;

  const [userData, setUserData] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (artist) getArtistData(artist.id).then((res) => setUserData(res));
  }, []);

  useEffect(() => {
    if (userData?.id) {
      getArtistFiles(userData.id).then((res) => setUserFiles(res));
    }
  }, [userData]);

  if (!userData?.uid || !userFiles[1]) {
    return (
      <div className="pgContain">
        <h1> Loading...</h1>
      </div>
    );
  }

  return (
    <div className="pgContain">
      {console.log(userData, userFiles)}
      <div className={classes.artistDetailContain}>
        <div className={classes.profile}>
          <img className={classes.img} src={artist.profileImage} />

          <div className={classes.info}>
            <p className={classes.name}>{userData?.name}</p>
            <p className={classes.bio}>{userData?.bio}</p>
            <div className={classes.socialLinks}>
              <Link href={userData?.twitter || "www.twitter.com"}>
                <img className={classes.socialIcon} src="/twitter-icon.png" />
              </Link>
              <Link href={userData?.instagram || "www.instagram.com"}>
                <img className={classes.socialIcon} src="/instagram-icon.png" />
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.userArtwork}>
          <PaginatedUserArt images={userFiles} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const artistId = context.params.id;

  const [artist] = getArtistById(artistId);

  //add this condition to avoid request getting kicked to [..slug]
  if (!artist) {
    return {
      notFound: true,
    };
  }
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
  return {
    paths: paths,
    fallback: "blocking",
    //anything thats not a path will recieve a 404//
  };
}
export default ArtistDetailPage;
