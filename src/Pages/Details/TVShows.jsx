import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import axios from "../../utils/axios";
import { useShows } from "../../context/TVShowProvider";
import { useParams } from "react-router-dom";
import "../../styles/details.css";
import { CircularProgress, TrailerModal } from "../../components";
import { useFilms } from "../../context/FilmProvider";

export const TVShows = () => {
  const [openModal, setOpenModal] = useState(false);

  const mContext = useFilms();
  const context = useShows();
  const params = useParams();

  const tvshow = context.selectedTVShow;
  const background = `https://image.tmdb.org/t/p/original/${tvshow.backdrop_path}`;

  const getTVShowDetails = async () => {
    try {
      const response = await axios.get(`/tv/${params.id}`, {
        params: {
          append_to_response: "videos,images,credits",
        },
      });
      context.setSelectedTVShow(response.data);
      mContext.setHomeImage(response.data.backdrop_path);
      context.setSelectedShowVideos(response.data.videos.results);
      context.setSelectedShowImages(response.data.images.backdrops);
    } catch (err) {
      console.log(err);
    } finally {
      context.setLoading(false);
    }
  };

  useEffect(() => {
    getTVShowDetails();
  }, []);

  const toggle = () => {
    if (!context?.loading && context.selectedShowVideos?.length !== 0) {
      setOpenModal(!openModal);
    }
  };

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
                    src={`https://image.tmdb.org/t/p/original${tvshow.poster_path}`}
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
                  <h2 className="title">{tvshow.name}</h2>
                ) : (
                  <div className="title-ph"></div>
                )}
                {!context.loading ? (
                  <h2 className="year">{`(${new Date(
                    tvshow.first_air_date
                  ).getFullYear()})`}</h2>
                ) : (
                  <div className="year-ph"></div>
                )}
              </div>

              <div>
                <p className="tagline">{tvshow.tagline}</p>
              </div>

              <div className="btns">
                <CircularProgress
                  value={!context.loading ? tvshow.vote_average : 0}
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
                  <p className="overview">{tvshow.overview}</p>
                ) : (
                  <div>
                    <div className="overview-ph"></div>
                    <div className="overview-ph"></div>
                    <div className="overview-ph"></div>
                  </div>
                )}
              </div>
              {tvshow.homepage !== "" && (
                <div className="homepage_link">
                  <MDBIcon
                    icon="link"
                    size="lg"
                    className="cyan-text pr-3 mr-2"
                  />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={tvshow.homepage}
                  >
                    {tvshow.homepage}{" "}
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
          context.loading && context.selectedMovieVideos !== null
            ? context.selectedMovieVideos.length === 0
              ? null
              : context.selectedMovieVideos.find(
                  (video) => video.type === "Trailer"
                )
            : null
        }
      />
    </div>
  );
};
