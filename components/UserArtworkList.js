import classes from "./styles/user-artwork-list.module.css";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import UserArtwork from "./UserArtwork";

function PaginatedUserArt(props) {
  const { images } = props;

  return (
    <div className={classes.list}>
      {images.map((img) => (
        <UserArtwork key={img.aid} img={img} />
      ))}
    </div>
  );
}

export default PaginatedUserArt;
