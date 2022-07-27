import { useState, useMemo } from "react";
import UserArtworkPagination from "./UserArtworkPagination";

import classes from "./styles/user-artwork-list.module.css";
import UserArtwork from "./UserArtwork";

function PaginatedUserArt(props) {
  const { images } = props;

  return (
    <div className={classes.list}>
      <UserArtworkPagination images={images} />
    </div>
  );
}

export default PaginatedUserArt;
