import classes from "./styles/artist-preview-list.module.css";
import ArtistPreview from "./ArtistPreview";

//props = allArtists
function ArtistPreviewList(props) {
  const { allArtists } = props;

  return (
    <div className={classes.list}>
      {allArtists.map((artist) => (
        <ArtistPreview key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
export default ArtistPreviewList;
