import { Fragment } from "react";
import ArtistPreviewList from "../../components/ArtistPreviewList";
import { getAllArtistData } from "../../DUMMY/dummy-backend";

function ArtistsPage() {
  return (
    <Fragment>
      <ArtistPreviewList />
    </Fragment>
  );
}

export default ArtistsPage;
