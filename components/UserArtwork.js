import classes from "./styles/user-artwork.module.css";
import Link from "next/link";
function UserArtwork(props) {
  const { img } = props;
  return (
    <div>
      <Link href={`/gallery/${img.aid}`}>
        <img className={classes.artwork} src={img.src} />
      </Link>
    </div>
  );
}

export default UserArtwork;
