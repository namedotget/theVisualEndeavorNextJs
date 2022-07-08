import classes from "./styles/artist-preview.module.css";
import Link from "next/link";

//props = artist
function ArtistPreview(props) {
  const { artist } = props;
  const path = `/artists/${artist.id}`;

  return (
    <div className={classes.artistContain}>
      <Link href={path}>
        <img className={classes.img} src={artist.profileImage} />
      </Link>
      <Link href={path}>
        <div className={classes.name}>{artist.name}</div>
      </Link>
    </div>
  );
}

export default ArtistPreview;
