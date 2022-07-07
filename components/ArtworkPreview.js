import classes from "./styles/artwork-preview.module.css";

function ArtworkPreview() {
  return (
    <div>
      <Link className={classes.profile}>
        <img />
      </Link>
      <Link className={classes.artwork}>
        <img />
      </Link>
    </div>
  );
}

export default ArtworkPreview;
