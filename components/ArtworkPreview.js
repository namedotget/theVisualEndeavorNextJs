import classes from "./styles/artwork-preview.module.css";
import Link from "next/link";

function ArtworkPreview(props) {
  const image = props.image;
  const artist = props.artist;

  return (
    <div className={classes.artPreviewContain}>
      <Link className={classes.profile} href={`/artists/${artist.id}`}>
        <img src={artist.profileImage} />
      </Link>
      <Link href={`/gallery/${image.aid}`}>
        <img className={classes.artwork} src={image.src} />
      </Link>
    </div>
  );
}

export default ArtworkPreview;
