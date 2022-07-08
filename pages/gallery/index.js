import { Fragment } from "react";
import GalleryPreviewList from "../../components/GalleryPreviewList";
import { getAllImages } from "../../DUMMY/dummy-backend";

function GalleryPage() {
  const allImages = getAllImages();

  return (
    <>
      <div className="pgContain">
        <GalleryPreviewList allImages={allImages} />
      </div>
    </>
  );
}

export default GalleryPage;
