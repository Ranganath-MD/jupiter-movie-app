import React from "react";
import "../../styles/details.css";
// import { MDBIcon } from "mdbreact"

const MovieInfo = ({ loading, movie }) => (
  <div className="details-container1">
    <div>
      <h2 className="col2-heading">Status</h2>
      <span className="value">{movie?.status}</span>
    </div>
    <div>
      <h2 className="col2-heading">Budget</h2>
      <span className="value">{movie?.budget}</span>
    </div>
    <div>
      {!loading && movie.genres !== undefined ? (
        movie?.genres?.length === 0 ? null : (
          <div>
            <h2 className="col2-heading">Genres</h2>
            {!loading &&
              movie.genres.map((genre, i) => {
                return (
                  <p className="looped-values" key={i}>
                    {genre.name}
                  </p>
                );
              })}
          </div>
        )
      ) : null}
    </div>
    <div>
      {!loading && movie.production_companies !== undefined ? (
        movie.production_companies.length === 0 ? null : (
          <div>
            <h2 className="col2-heading">Produced By</h2>
            {!loading &&
              movie.production_companies.map((comp, i) => {
                return (
                  <p className="looped-values" key={i}>
                    {comp.name}
                  </p>
                );
              })}
          </div>
        )
      ) : null}
    </div>
    <div>
      {!loading && movie.spoken_languages !== undefined ? (
        movie.spoken_languages.length === 0 ? null : (
          <div>
            <h2 className="col2-heading">Languages</h2>
            {!loading &&
              movie.spoken_languages.map((lang, i) => {
                return (
                  <p className="looped-values" key={i}>
                    {lang.name}
                  </p>
                );
              })}
          </div>
        )
      ) : null}
    </div>
    <div>
      <h2 className="col2-heading">Votes</h2>
      <span className="value">{movie.vote_count}</span>
    </div>
  </div>
);

const TVInfo = ({ loading, tvshow }) => (
  <div className="details-container1">
    <div>
      {!loading && tvshow.seasons !== undefined ? (
        tvshow.seasons.length === 0 ? null : (
          <div>
            <h2 className="col2-heading">Seasons</h2>
            {!loading &&
              tvshow.seasons.map((creator, i) => {
                return (
                  <p className="looped-values" key={i}>
                    {creator.name}
                  </p>
                );
              })}
          </div>
        )
      ) : null}
    </div>
    <div>
      <h2 className="col2-heading"># of Seasons</h2>
      <span className="value">{tvshow.number_of_seasons}</span>
    </div>
    <div>
      <h2 className="col2-heading"># of Episodes</h2>
      <span className="value">{tvshow.number_of_episodes}</span>
    </div>
    <div>
      <h2 className="col2-heading">Craeted By</h2>
      {tvshow.created_by?.map((creator, i) => {
          return (
            <p className="looped-values" key={i}>
              {creator.name}
            </p>
          );
        })}
    </div>
    <div>
      <h2 className="col2-heading">Status</h2>
      <span className="value">{tvshow.status}</span>
    </div>
    <div>
      {!loading && tvshow.genres !== undefined ? (
        tvshow.genres.length === 0 ? null : (
          <div>
            <h2 className="col2-heading">Genres</h2>
            {!loading &&
              tvshow.genres.map((genre, i) => {
                return (
                  <p className="looped-values" key={i}>
                    {genre.name}
                  </p>
                );
              })}
          </div>
        )
      ) : null}
    </div>
    <div>
      {!loading && tvshow.languages !== undefined ? (
        tvshow.length === 0 ? null : (
          <div>
            <h2 className="col2-heading">Languages</h2>
            {tvshow.languages.map((lang, i) => {
              return (
                <p className="looped-values" key={i}>
                  {lang}
                </p>
              );
            })}
          </div>
        )
      ) : null}
    </div>
    <div>
      {!loading && tvshow.production_companies !== undefined ? (
        tvshow.length === 0 ? null : (
          <div>
            <h2 className="col2-heading">Produced By</h2>
            {!loading &&
              tvshow.production_companies.map((comp, i) => {
                return (
                  <p className="looped-values" key={i}>
                    {comp.name}
                  </p>
                );
              })}
          </div>
        )
      ) : null}
    </div>
    <div>
      <h2 className="col2-heading">Votes</h2>
      <span className="value">{tvshow.vote_count}</span>
    </div>
  </div>
);

export const Info = ({ type, details, loading }) => {
  if (type === "movie") {
    return <MovieInfo loading={loading} movie={details} />
  } else {
    return <TVInfo loading={loading} tvshow={details} />;
  }
};
