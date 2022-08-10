import ArtistPreviewList from "../../components/ArtistPreviewList";

function ArtistsPage(props) {
  const { allData } = props;

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
