import ArtworkPreview from "./ArtworkPreview";
import classes from "./styles/gallery-preview-list.module.css";
import { v4 } from "uuid";
import { useRef } from "react";
function GalleryPreviewList(props) {
  const { allImages } = props;

  return (
    <div className={classes.list}>
      {allImages.map((img) => (
        <ArtworkPreview key={v4()} image={img} />
      ))}
    </div>
  );
}

export default GalleryPreviewList;
