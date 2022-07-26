import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../hooks/usePagination";
import classes from "./styles/pagination.module.scss";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length[0] < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange.length[0] - 1;
  return (
    <ul
      className={classnames(classes.paginationContain, {
        [className]: className,
      })}
    >
      {/* Left navigation arrow */}
      <li
        className={classnames(classes.paginationItem, {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className={classes.arrow} />
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className={classes.paginationItem.dots}>&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={classnames(classes.paginationItem, {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames(classes.paginationItem, {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className={classes.arrow} />
      </li>
    </ul>
  );
};

export default Pagination;
