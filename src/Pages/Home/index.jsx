import React, { useState, useEffect } from "react";
import { MDBContainer, MDBCol, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { TrendingMoviesToday } from "./TrendingMoviesToday";
import { TrendingTVToday } from "./TrendingTVToday";
import { PopularMovies } from "./PopularMovies";
import "../../styles/home.css";
import { TopRatedMovieTrailers } from "./MovieTrailers";
import { useFilms } from "../../context/FilmProvider";

export const Home = () => {
  const context = useFilms(); 
  const [query, setQuery] = useState("");
  const [showTrMovies, setShowTrMovies] = useState(false);

  const backdrop =
    context.homeImage === ""
      ? "https://image.tmdb.org/t/p/original/ovM06PdF3M8wvKb06i4sjW3xoww.jpg"
      : `https://image.tmdb.org/t/p/original/${context.homeImage}`;

  const handleSearch = () => {
    if (query === "") {
      console.log("There is no query");
    } else {
      localStorage.setItem("query", query);
      setRedirect(true);
    }
  };

  useEffect(() => {
    setShowTrMovies(true);
  }, []);

  return (
    <>
      <div
        className="home-component"
        style={{
          backgroundImage: `url(${backdrop})`,
        }}
      >
        <MDBContainer>
          <p className="subtitle">Browse your favourite Movies and TV Shows</p>
          <MDBCol sm="12" md="12" lg="12">
            <form className="form-inline mt-4 mb-4">
              <input
                className="form-control"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movie/TV shows"
                aria-label="Search"
              />
            </form>
            <MDBBtn
              size="sm"
              color="success"
              onClick={handleSearch}
              className="search_btn"
            >
              Search <MDBIcon icon="search" />
            </MDBBtn>
          </MDBCol>
        </MDBContainer>
      </div>
      <div className="container2">
        <div>
          <h2 className="category_headings">Popular movies</h2>
          <PopularMovies />
        </div>
        <div>
          <TopRatedMovieTrailers />
        </div>
        <div className="trending_container">
          <h2 className="category_headings">Trending today</h2>
          <div>
            <button
              onClick={() => setShowTrMovies(true)}
              className={showTrMovies ? "btn_active1" : "btn1"}
            >
              Movies
            </button>
            <button
              onClick={() => setShowTrMovies(false)}
              className={!showTrMovies ? "btn_active2" : "btn2"}
            >
              Tv
            </button>
          </div>
        </div>
        <div>
          {showTrMovies ? <TrendingMoviesToday /> : <TrendingTVToday />}
        </div>
      </div>
    </>
  );
};
