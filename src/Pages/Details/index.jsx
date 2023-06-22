import React from "react";
import { Movie } from "./Movie";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Link, useLocation, useParams } from "react-router-dom";
import CastCard from "../../components/layout/CastCard";
import { useFilms } from "../../context/FilmProvider";
import { Reviews } from "./Reviews";
import { Info } from "./Info";
import { Recommendations } from "./Recommendations";
import { TVShows } from "./TVShows";
import { useShows } from "../../context/TVShowProvider";

export const Details = () => {
  const context = useFilms();
  const tvcontext = useShows();
  const movie = context?.selectedMovie;
  const tvshow = tvcontext.selectedTVShow;

  const params = useParams();
  const location = useLocation();

  const type = location.pathname.includes("movie") ? "movie" : "tv";
  const images = location.pathname.includes("movie")
    ? context.selectedMovieImages
    : tvcontext.selectedShowImages;

  console.log(images);

  return (
    <div>
      {type === "movie" ? <Movie /> : <TVShows />}

      <MDBContainer>
        <MDBRow>
          <MDBCol size="12" sm="8" md="8" lg="8">
            {/* Cast and Crew */}
            <h2 className="cast-title">Top Billed Cast</h2>
            <div className="hr-line" />
            <CastCard
              loading={context.loading}
              cast={type === "movie" ? movie : tvshow}
            />

            <p className="cast-btn">
              <Link to={`/discover/movie/${params.id}/cast-crew`}>
                Full Cast & Crew
              </Link>
            </p>

            <div>
              {!context.loading && images?.length !== 0 ? (
                <div>
                  <h2 className="cast-title">Images</h2>
                  <div className="hr-line"></div>
                  <section className="hr-card">
                    {!context.loading &&
                      images?.map((image, i) => {
                        return (
                          <img
                            src={`https://image.tmdb.org/t/p/original/${image?.file_path}`}
                            alt="poster"
                            key={i}
                            className="backdrop-img"
                          />
                        );
                      })}
                  </section>
                </div>
              ) : null}
            </div>

            <Reviews type={type} />
          </MDBCol>
          <MDBCol size="12" sm="4" md="4" lg="4">
            <Info
              details={type === "movie" ? movie : tvshow}
              loading={context.loading}
            />
          </MDBCol>
        </MDBRow>
        <Recommendations type={type} />
      </MDBContainer>
    </div>
  );
};
