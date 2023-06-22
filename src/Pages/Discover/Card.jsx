import React from "react";
import { Link } from "react-router-dom";
import "../../styles/discovercard.css";

export const DeatilsCard = ({ result, type, loaded }) => {
  return (
    <Link
      to={
        type === "movies"
          ? `/discover/movie/${result.id}`
          : `/discover/tv-shows/${result.id}`
      }
    >
      <div className="movie-card">
        <div className="movie-image">
          <img
            src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
            alt="movie"
            className="img"
          />
        </div>
        <div className="movie-container">
          <div className="movie-header">
            <div>
              <p className="movie-title">
                {type === "movies" ? result.title : result.original_name}
              </p>
              <p className="release-date">
                {type === "movies"
                  ? result.release_date
                  : result.first_air_date}
              </p>
            </div>
          </div>
          <div className="movie-desc">{result.overview}</div>
        </div>
      </div>
    </Link>
  );
};
