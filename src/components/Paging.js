import React, { useState } from "react";
import "./Paging.css";

const Paging = ({ page, pages, setPage, setIsLoaded }) => {
  // build array containing pages of pagination
  let paging = [];
  const limitNbPages = 10;

  // definition of the pages to put in the pagination
  if (page.number < limitNbPages) {
    paging = pages.slice(0, limitNbPages);
  } else if (page.number > pages.length - limitNbPages) {
    paging = pages.slice(pages.length - limitNbPages, pages.length);
  } else {
    paging = pages.slice(page.number - 6, page.number + 4);
  }

  return (
    <div className="paging">
      {page.number > limitNbPages && (
        <span
          onClick={() => {
            const pageIndex = pages.findIndex(
              (elem) => elem.number === page.number
            );
            setIsLoaded(false);
            setPage(pages[pageIndex - limitNbPages]);
          }}
        >
          {"<<"}
        </span>
      )}

      {page.number > 1 && (
        <span
          onClick={() => {
            const pageIndex = pages.findIndex(
              (elem) => elem.number === page.number
            );
            setIsLoaded(false);
            setPage(pages[pageIndex - 1]);
          }}
        >
          {"<"}
        </span>
      )}

      {paging.map((elem, index) => {
        return (
          <span
            key={elem.number}
            onClick={() => {
              setIsLoaded(false);
              setPage(elem);
            }}
            className={elem.number === page.number ? "isSelected" : null}
          >
            {elem.number}
          </span>
        );
      })}

      {page.number < pages.length && (
        <span
          onClick={() => {
            const pageIndex = pages.findIndex(
              (elem) => elem.number === page.number
            );
            setIsLoaded(false);
            setPage(pages[pageIndex + 1]);
          }}
        >
          {">"}
        </span>
      )}

      {page.number + limitNbPages < pages.length && (
        <span
          onClick={() => {
            const pageIndex = pages.findIndex(
              (elem) => elem.number === page.number
            );
            setIsLoaded(false);
            setPage(pages[pageIndex + limitNbPages]);
          }}
        >
          {">>"}
        </span>
      )}
    </div>
  );
};

export default Paging;
