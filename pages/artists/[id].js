import classes from "../../styles/artist-detail.module.scss";
import Link from "next/link";
import PaginatedUserArt from "../../components/UserArtworkList";
import { useEffect, useState } from "react";

function ArtistDetailPage(props) {
  const { artistID } = props;
  const { allFiles, allData } = props;
  const [userFiles, setUserFiles] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (allData && artistID && !userData) {
      setUserData(...allData.filter((user) => user.id === artistID));
    }
    if (userData && allFiles[1] && !userFiles[1]) {
      setUserFiles(
        allFiles.filter((file) => file.id.slice(0, 2) === userData?.id)
      );
      console.log(userFiles);
    }
  }, [artistID, allFiles, allData, userData]);

  if (!userData || !userFiles) {
    return (
      <div className="pgContain">
        <h1> Loading...</h1>
      </div>
    );
  }

  return (
    <div className="pgContain">
      <div className={classes.artistDetailContain}>
        <div className={classes.profile}>
          <img
            className={classes.img}
            src={`../../icons/${userData.id}-icon.png`}
          />

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
  const artistID = context.params.id;

  //add this condition to avoid request getting kicked to [..slug]
  if (!artistID) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      artistID,
    },
    revalidate: 60,
  };
}
///TELL NEXT JS WHICH PATHS TO EXPECT FROM DYNAMIC PAGE///
export async function getStaticPaths() {
  const allArtistIDs = [{ id: "a1" }, { id: "a2" }, { id: "a3" }, { id: "a4" }];
  const paths = allArtistIDs.map((artist) => ({
    params: { id: artist.id },
  }));
  return {
    paths: paths,
    fallback: "blocking",
    //anything thats not a path will recieve a 404//
  };
}
export default ArtistDetailPage;
