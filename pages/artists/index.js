import ArtistPreviewList from "../../components/ArtistPreviewList";
import { getAllArtistData } from "../../DUMMY/dummy-backend";
import { useRouter } from "next/router";

function ArtistsPage() {
  const router = useRouter();

  return (
    <>
      <div className="pgContain">
        <ArtistPreviewList allArtists={getAllArtistData()} />
      </div>
    </>
  );
}

export default ArtistsPage;
