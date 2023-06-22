import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../utils/axios";
import { useFilms } from "../../context/FilmProvider";
import "../../styles/home.css";

export const TrendingMoviesToday = () => {
  const context = useFilms();
  const navigate = useNavigate();

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const response = await axios.get("/trending/movie/day");
        context.setLoading(true);
        context.setTrendingMoviesToday(response.data.results);
      } catch {
        console.log("failed to load trending movies");
      }
    };

    getTrendingMovies();
  }, []);

  const handleTrendingMoviesToday = (movie) => {
    navigate(`/discover/movie/${movie.id}`);
  };

  return (
    <div>
      <section className="hr_popular_cards">
        {context.loading &&
          context.trendingMoviesToday.map((movie, i) => {
            return (
              <div
                className="sp_card"
                key={i}
                onClick={() => handleTrendingMoviesToday(movie)}
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
    </div>
  );
};
