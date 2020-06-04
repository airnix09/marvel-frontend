import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Paging from "../components/Paging";
import Search from "../components/Search";
import "./Comics.css";

const Comics = ({ setFavoriteComics, favoriteComics }) => {
  const pages = [];
  const context = "comics";

  const [data, setData] = useState();
  const [page, setPage] = useState({
    url: "https://marvel-project-backend.herokuapp.com/comics?",
    number: 1,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [searched, setSearched] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(page.url);
      setData(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // define pagination
  if (isLoaded) {
    const urlbase = "https://marvel-project-backend.herokuapp.com/comics?";
    const nbPages = Math.ceil(data.total / 100);

    if (searched) {
      for (let i = 0; i < nbPages; i++) {
        pages.push({
          url: urlbase + "search=" + searched + "&page=" + (i + 1),
          number: i + 1,
        });
      }
    } else {
      for (let i = 0; i < nbPages; i++) {
        pages.push({ url: urlbase + "page=" + (i + 1), number: i + 1 });
      }
    }
    console.log("pages", pages);
  }

  return (
    <div className="comics">
      <div className="container">
        <Search
          context={context}
          setPage={setPage}
          setSearched={setSearched}
          setIsLoaded={setIsLoaded}
        />
        {isLoaded && (
          <Paging
            setIsLoaded={setIsLoaded}
            setPage={setPage}
            pages={pages}
            page={page}
          />
        )}
        <div className="result">
          {isLoaded ? (
            data.results.map((elem, index) => {
              return (
                <Card
                  id={elem.id}
                  key={elem.id}
                  title={elem.title}
                  picture={elem.thumbnail.path + "." + elem.thumbnail.extension}
                  description={elem.description}
                  setFavoriteComics={setFavoriteComics}
                  favoriteComics={favoriteComics}
                  context={context}
                />
              );
            })
          ) : (
            <div className="charging">Chargement en cours</div>
          )}
        </div>
        {isLoaded && (
          <Paging
            setIsLoaded={setIsLoaded}
            setPage={setPage}
            pages={pages}
            page={page}
          />
        )}
      </div>
    </div>
  );
};

export default Comics;
