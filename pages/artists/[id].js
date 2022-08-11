import classes from "../../styles/artist-detail.module.scss";
import Link from "next/link";
import Image from "next/image";
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
  });

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
          <div className={classes.img}>
            <Image
              src={`/icons/${userData.id.trim()}-icon.png`}
              width={500}
              height={500}
            />
          </div>

          <div className={classes.info}>
            <p className={classes.name}>{userData?.name}</p>
            <p className={classes.bio}>{userData?.bio}</p>
            <div className={classes.socialLinks}>
              <Link href={userData?.twitter}>
                <div className={classes.socialIcon}>
                  <Image src="/twitter-icon.png" width={50} height={50} />
                </div>
              </Link>
              <Link href={userData?.instagram}>
                <div className={classes.socialIcon}>
                  <Image src="/instagram-icon.png" width={50} height={50} />
                </div>
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
