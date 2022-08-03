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

function ArtistDetailPage(props) {
  const artist = props.selectedArtist;

  const [userData, setUserData] = useState(null);
  const [userFiles, setUserFiles] = useState([]);

  async function getArtistData() {
    const dbRef = doc(db, `artists/${artist.id}`);
    const data = await getDoc(dbRef);
    setUserData(data.data());

    const dbRef2 = collection(db, `artists/${artist.id}/files`);
    const files = await getDocs(dbRef2);
    files.docs.forEach((doc) => {
      setUserFiles((prev) => [...prev, doc.data()]);
    });
  }

  if (!artist) {
    return (
      <div className="pgContain">
        <h1> Loading...</h1>
      </div>
    );
  }

  useEffect(() => {
    getArtistData();
  }, []);
  return (
    <div className="pgContain">
      {console.log(userFiles)}
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
          <PaginatedUserArt user={userData} />
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
