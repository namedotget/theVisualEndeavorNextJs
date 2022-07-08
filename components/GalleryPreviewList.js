import { getArtistById } from "../DUMMY/dummy-backend";
import ArtworkPreview from "./ArtworkPreview";
import classes from "./styles/gallery-preview-list.module.css";

function GalleryPreviewList(props) {
  const { allImages } = props;
  console.log("gallery", allImages);
  return (
    <div className={classes.list}>
      {allImages.map((img) => (
        <ArtworkPreview
          key={img.aid}
          image={img}
          artist={getArtistById(img.aid.slice(0, 2))}
        />
      ))}
    </div>
  );
}

export default GalleryPreviewList;
