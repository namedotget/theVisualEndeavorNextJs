import classes from "./styles/artist-preview.module.css";
import Link from "next/link";
import Image from "next/image";

//props = artist
function ArtistPreview(props) {
  const { artist } = props;
  const path = `/artists/${artist.id}`;

  return (
    <Link href={path}>
      <div className={classes.artistContain}>
        <div className={classes.img}>
          <Image
            src={`/icons/${artist.id}-icon.png`}
            width={200}
            height={200}
          />
        </div>

        <div className={classes.name}>{artist.name}</div>
      </div>
    </Link>
  );
}

export default ArtistPreview;
