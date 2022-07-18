import classes from "./styles/user-artwork-list.module.css";
import UserArtwork from "./UserArtwork";

function PaginatedUserArt(props) {
  const { images } = props;

  return (
    <div className={classes.list}>
      {images.map((img) => (
        <UserArtwork key={img.aid} img={img} />
      ))}
    </div>
  );
}

export default PaginatedUserArt;
