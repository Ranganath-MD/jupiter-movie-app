import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "../../utils/axios";
import { useFilms } from "../../context/FilmProvider";
import { useParams } from "react-router-dom";
import { CircularProgress, TrailerModal } from "../../components";
import "../../styles/details.css";

export const Movie = () => {
  const [openModal, setOpenModal] = useState(false);
  const context = useFilms();
  const params = useParams();

  const movie = context.selectedMovie;
  const background = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

  const getMovieDetails = async () => {
    context.setLoading(true);
    try {
      const response = await axios.get(`/movie/${params.id}`, {
        params: {
          append_to_response: "videos,images,credits",
        },
      });
      context.setSelectedMovie(response.data);
      context.setHomeImage(response.data.backdrop_path);
      context.setSelectedMovieVideos(response.data.videos.results);
      context.setSelectedMovieImages(response.data.images.backdrops);
      context.setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  const toggle = () => {
    if (!context.loading && context.selectedMovieVideos.length !== 0) {
      setOpenModal(open => !open);
    }
  };

  console.log(openModal)

  return (
    <div className="movie-container">
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundColor: "#131111",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          backgroundBlendMode: "overlay",
        }}
      >
        <MDBContainer>
          <MDBRow>
            <MDBCol size="12" sm="4" md="4" lg="4">
              <div>
                {!context.loading ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original${context.selectedMovie.poster_path}`}
                    alt="poster"
                    className="poster-img"
                  />
                ) : (
                  <div className="poster-img-ph"></div>
                )}
              </div>
            </MDBCol>
            <MDBCol
              size="12"
              sm="8"
              md="8"
              lg="8"
              className="details-container"
            >
              <div className="title-container">
                {!context.loading ? (
                  <h2 className="title">{movie.title}</h2>
                ) : (
                  <div className="title-ph"></div>
                )}
                {!context.loading ? (
                  <h2 className="year">{`(${new Date(
                    movie.release_date
                  ).getFullYear()})`}</h2>
                ) : (
                  <div className="year-ph"></div>
                )}
              </div>

              <div>
                <p className="tagline">{movie.tagline}</p>
              </div>

              <div className="btns">
                <CircularProgress
                  value={!context.loading ? movie.vote_average : 0}
                />

                <h2 className="rating-text">User rating</h2>

                <button className="trailer-btn" onClick={toggle}>
                  <MDBIcon icon="play" className="mr-2"></MDBIcon>
                  <span>Play trailer</span>
                </button>
              </div>

              <div>
                <p className="overview-title">Overview</p>
                {!context.loading ? (
                  <p className="overview">{movie.overview}</p>
                ) : (
                  <div>
                    <div className="overview-ph"></div>
                    <div className="overview-ph"></div>
                    <div className="overview-ph"></div>
                  </div>
                )}
              </div>
              {movie.homepage !== "" && (
                <div className="homepage_link">
                  <MDBIcon
                    icon="link"
                    size="lg"
                    className="cyan-text pr-3 mr-2"
                  />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={movie.homepage}
                  >
                    {movie.homepage}{" "}
                  </a>
                </div>
              )}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>


      <TrailerModal
        show={openModal}
        setShow={setOpenModal}
        trailer={
          !context.loading && context.selectedMovieVideos !== null
            ? context.selectedMovieVideos.length === 0
              ? null
              : !openModal ? "" : context.selectedMovieVideos.find(
                  (video) => video.type === "Trailer"
                )
            : null
        }
      />
    </div>
  );
};
