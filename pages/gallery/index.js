import GalleryPreviewList from "../../components/GalleryPreviewList";
import { useEffect, useState } from "react";

function GalleryPage(props) {
  const { allFiles } = props;

  if (!allFiles[1]) return <div>...loading...</div>;

  return (
    <>
      <div className="pgContain">
        <GalleryPreviewList
          allImages={allFiles.filter((file) => file.type !== "music")}
        />
      </div>
    </>
  );
}

export default GalleryPage;
