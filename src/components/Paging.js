import React, { useState } from "react";
import "./Paging.css";

const Paging = ({ page, pages, setPage, setIsLoaded }) => {
  console.log("page", page);
  // déclaration des states
  const [pageSelected, setPageSelected] = useState(1);

  // constitution du tableau de pages affichées dans la pagination
  let paging = [];
  const limitNbPages = 10;

  // traitement si la page est chargée
  if (page.number < limitNbPages) {
    // on déverse dans le tableau le résultat du slice
    paging = pages.slice(0, limitNbPages); // on fixe la pagination à partir de 0
  } else if (page.number > pages.length - limitNbPages) {
    // on déverse dans le tableau le résultat du slice
    paging = pages.slice(pages.length - limitNbPages, pages.length); // on fixe la pagination à partir de la fin
  } else {
    // on déverse dans le tableau le résultat du slice
    paging = pages.slice(page.number - 6, page.number + 4); // on place les pages autours de celle choisie
  }
  console.log("paging", paging);
  console.log(page.number);

  return (
    <div className="paging">
      {page.number > limitNbPages && (
        <span
          onClick={() => {
            // on cherche l'index de la page actuelle dans pages
            const pageIndex = pages.findIndex(
              elem => elem.number === page.number
            ); // prend une fonction anonyme
            // et on dit qu'on recharge à nouveau
            setIsLoaded(false);
            // on envoie la page inférieure
            setPage(pages[pageIndex - limitNbPages]);
          }}
        >
          {"<<"}
        </span>
      )}

      {page.number > 1 && (
        <span
          onClick={() => {
            // on cherche l'index de la page actuelle dans pages
            const pageIndex = pages.findIndex(
              elem => elem.number === page.number
            ); // prend une fonction anonyme
            // et on dit qu'on recharge à nouveau
            setIsLoaded(false);
            // on envoie la page inférieure
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
              console.log(elem.number);
              console.log(index);
              // et on dit qu'on recharge à nouveau
              setIsLoaded(false);
              // on met à jour l'url avec la clé url de la page et lui lance la récupération des données
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
            // on cherche l'index de la page actuelle dans pages
            const pageIndex = pages.findIndex(
              elem => elem.number === page.number
            ); // prend une fonction anonyme
            // et on dit qu'on recharge à nouveau
            setIsLoaded(false);
            // on envoie la page supérieure
            setPage(pages[pageIndex + 1]);
          }}
        >
          {">"}
        </span>
      )}

      {page.number + limitNbPages < pages.length && (
        <span
          onClick={() => {
            // on cherche l'index de la page actuelle dans pages
            const pageIndex = pages.findIndex(
              elem => elem.number === page.number
            ); // prend une fonction anonyme
            // et on dit qu'on recharge à nouveau
            setIsLoaded(false);
            // on envoie la page inférieure
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
