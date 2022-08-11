import classes from "./styles/user-artwork.module.scss";
import Link from "next/link";
import Image from "next/image";
function UserArtwork(props) {
  const { img } = props;
  return (
    <div className={classes.animatedContain}>
      <Link href={`/gallery/${img.id}`}>
        <div className={classes.artwork}>
          {img.type === "video" ? (
            <video src={img.url} width={150} height={150} />
          ) : (
            <Image src={img.url} width={150} height={150} />
          )}
        </div>
      </Link>
    </div>
  );
}

export default UserArtwork;
