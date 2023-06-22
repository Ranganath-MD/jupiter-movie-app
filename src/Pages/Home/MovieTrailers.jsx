import React, { useState, useEffect, useContext } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBModalDialog,
  MDBModalHeader,
  MDBBtn,
  MDBModalContent,
  MDBModalTitle,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { Carousel, ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useFilms } from "../../context/FilmProvider";
import axios from "../../utils/axios";
import backgroundImage from "../../assets/thor.jpg";
import play from "../../assets/play.png";
import "../../styles/toptrailers.css";

export const TopRatedMovieTrailers = () => {
  const context = useFilms();
  const [background, setBackgroud] = useState("");
  const [video, setVideo] = useState({});
  const [modal, setModal] = useState(false);

  const videoSrc =
    video === null
      ? `https://www.youtube.com/embed/bz9dOy3Zd6s`
      : `https://www.youtube.com/embed/${video.key}`;

  useEffect(() => {
    const getMovieTrailers = async () => {
      try {
        const response = await axios.get("movie/top_rated");
        context.setLoading(true);
        context.setTopRatedMovies(response.data.results);
      } catch {
        console.log("failed to load top rated movie trailers");
      }
    };

    getMovieTrailers();
  }, []);

  const handleTrailerModal = async (id) => {
    setModal(true);
    try {
      const response = await axios.get(`/movie/${id}/videos`);
      if (response.data.results.length === 0) {
        setVideo(null);
      } else {
        const trailer = response.data.results.find(
          (dt) => dt.type === "Trailer"
        );
        if (trailer !== undefined) {
          setVideo(trailer);
        } else {
          const teaser = response.data.results.find(
            (dt) => dt.type === "Teaser"
          );
          setVideo(teaser);
        }
      }
    } catch {
      setVideo(null);
    }
  };

  const handleImage = (img) => {
    const url = `https://image.tmdb.org/t/p/original/${img}`;
    setBackgroud(url);
  };

  return (
    <div
      className="trailer-container"
      style={{
        backgroundImage: `url(${background ?? backgroundImage})`,
      }}
    >
      <section className="hr_trailers_cards">
        {context.topRatedMovies?.map((movie, i) => {
          return (
            <div
              className="top_card"
              key={i}
              onClick={() => handleTrailerModal(movie.id)}
              onMouseOver={() => handleImage(movie.backdrop_path)}
            >
              <div
                style={{ position: "relative" }}
                className="view overlay zoom"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt="top rated movie trailers"
                  key={i}
                  className="backdrop"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = backgroundImage;
                  }}
                />
              </div>
              <p className="p_movie_title">{movie.title}</p>
              <p className="p_date">{movie.release_date}</p>
            </div>
          );
        })}
      </section>

      <MDBModal
        tabIndex="-1"
        show={modal}
        setShow={setModal}
        size="lg"
        backdrop={false}
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className="modal_head">
              {video === null ? (
                <span className="modal_title">There is no trailer found</span>
              ) : (
                <span className="modal_title">Play</span>
              )}
            </MDBModalHeader>
            <MDBModalBody className="modal_body">
              <iframe
                width="100%"
                height="100%"
                title="trailer"
                src={!modal ? "" : videoSrc}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};
