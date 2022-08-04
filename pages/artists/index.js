import ArtistPreviewList from "../../components/ArtistPreviewList";
import { getAllArtistData } from "../../DUMMY/dummy-backend";
import { getAllData } from "../../firebase/helpers";
import { useEffect, useState } from "react";

function ArtistsPage() {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    if (!allData[1]) getAllData().then((res) => setAllData(res));
    console.log(allData);
  });

  if (!allData[1]) return;
  return (
    <>
      <div className="pgContain">
        <ArtistPreviewList allArtists={allData} />
      </div>
    </>
  );
}

export default ArtistsPage;
