import classes from "./styles/artwork-preview.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

function ArtworkPreview(props) {
  const image = props.image;
  const artist = props.artist;

  const img = useRef();

  return (
    <div className={classes.artPreviewContain} ref={img}>
      <Link href={`/gallery/${image.id}`}>
        <div className={classes.artwork}>
          {image.type === "video" ? (
            <video className={classes.artwork} src={image.url} />
          ) : (
            <Image src={image.url} alt={image.name} width={500} height={500} />
          )}
        </div>
      </Link>
    </div>
  );
}

export default ArtworkPreview;
