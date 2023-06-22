import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useFilms } from "../../context/FilmProvider";
import "../../styles/home.css";

export const PopularMovies = () => {
  const context = useFilms();
  const navigate = useNavigate();

  // setPopularMovies
  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await axios.get("/movie/popular");
        context.setLoading(true);
        context.setPopularMovies(response.data.results);
      } catch {
        console.log("failed to load popular films");
      }
    };

    getPopularMovies();
  }, []);

  const handlePopularMovie = (movie) => {
    navigate(`/discover/movie/${movie.id}`);
  };

  return (
    <section className="hr_popular_cards">
      {context.loading &&
        context.popularMovies.map((movie, i) => {
          return (
            <div
              className="sp_card"
              key={i}
              onClick={() => handlePopularMovie(movie)}
            >
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt="poster"
                  key={i}
                  className="backdrop"
                />
              </div>

              <p className="p_movie_title">{movie.title}</p>
              <p className="p_date">{movie.release_date}</p>
            </div>
          );
        })}
    </section>
  );
};
