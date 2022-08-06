import { Fragment, useEffect, useState } from "react";
import GalleryPreviewList from "../../components/GalleryPreviewList";
import { getAllData, getAllImages } from "../../DUMMY/dummy-backend";
import { getAllFiles } from "../../firebase/helpers";

function GalleryPage(props) {
  const [allFiles, setAllFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return () => {
      if (!allFiles[1] && loading)
        getAllFiles().then((res) => {
          res.forEach((user) => {
            user.then((data) => {
              setAllFiles((prev) => [
                ...prev,
                ...data.filter((data) => data?.url && data?.type !== "music"),
              ]);
            });
          });
          setLoading(false);
        });
    };
  }, []);

  if (!allFiles[1]) return <div>...loading allFiles...</div>;

  return (
    <>
      <div className="pgContain">
        <GalleryPreviewList allImages={allFiles} />
      </div>
    </>
  );
}

export default GalleryPage;
