import classes from "./styles/user-artwork.module.scss";
import Link from "next/link";
function UserArtwork(props) {
  const { img } = props;
  return (
    <div className={classes.animatedContain}>
      <Link href={`/gallery/${img.id}`}>
        {img.type === "video" ? (
          <video className={classes.artwork} src={img.url} />
        ) : (
          <img className={classes.artwork} src={img.url} />
        )}
      </Link>
    </div>
  );
}

export default UserArtwork;
