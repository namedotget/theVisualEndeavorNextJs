import classes from "./styles/artist-preview.module.css";
import Link from "next/link";

//props = artist
function ArtistPreview(props) {
  const { artist } = props;
  const path = `/artists/${artist.id}`;

  return (
    <Link href={path}>
      <div className={classes.artistContain}>
        <img className={classes.img} src={`./icons/${artist.id}-icon.png`} />

        <div className={classes.name}>{artist.name}</div>
      </div>
    </Link>
  );
}

export default ArtistPreview;
