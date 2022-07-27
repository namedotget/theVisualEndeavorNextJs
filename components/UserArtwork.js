import classes from "./styles/user-artwork.module.scss";
import Link from "next/link";
function UserArtwork(props) {
  const { img } = props;
  return (
    <div className={classes.animatedContain}>
      <Link href={`/gallery/${img.aid}`}>
        <img className={classes.artwork} src={img.src} />
      </Link>
    </div>
  );
}

export default UserArtwork;
