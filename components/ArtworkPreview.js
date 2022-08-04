import classes from "./styles/artwork-preview.module.scss";
import Link from "next/link";

function ArtworkPreview(props) {
  const image = props.image;
  const artist = props.artist;

  if (!image) return <div>...loading image...</div>;

  return (
    <div className={classes.artPreviewContain}>
      <Link href={`/gallery/${image.id}`}>
        {image.type === "video" ? (
          <video className={classes.artwork} src={image.url} />
        ) : (
          <img className={classes.artwork} src={image.url} />
        )}
      </Link>
    </div>
  );
}

export default ArtworkPreview;
