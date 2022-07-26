import { useState, useMemo } from "react";
import Pagination from "./Pagination";
import classes from "./styles/user-artwork-list.module.css";
import UserArtwork from "./UserArtwork";

let PageSize = 3;

function PaginatedUserArt(props) {
  const { images } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return images.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div>
      <div className={classes.list}>
        {paginatedData.map((img) => (
          <UserArtwork key={img.aid} img={img} />
        ))}
      </div>
      <Pagination
        key={"p1"}
        className={classes.paginationBar}
        currentPage={currentPage}
        totalCount={images.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default PaginatedUserArt;
