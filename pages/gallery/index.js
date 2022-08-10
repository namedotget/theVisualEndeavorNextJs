import GalleryPreviewList from "../../components/GalleryPreviewList";

function GalleryPage(props) {
  return (
    <>
      <div className="pgContain">
        <GalleryPreviewList
          allImages={props.allFiles.filter((file) => file.type !== "music")}
        />
      </div>
    </>
  );
}

export default GalleryPage;
