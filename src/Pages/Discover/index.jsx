import React, { useContext, useEffect, useState } from "react";
import { useFilms } from "../../context/FilmProvider";
import axios from "../../utils/axios";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { LoadingSpinner } from "../../components";
import { DeatilsCard } from "./Card";
import { useShows } from "../../context/TVShowProvider";

export const Discover = ({ type }) => {
  const context = useFilms();
  const tvContext = useShows();
  const [totalCount, setTotalCount] = useState(0);
  const [loaded, setLoaded] = useState(true);

  const handlePageChange = (pageNumber) => {
    context.setPage(pageNumber);
  };

  const getAllMovies = async () => {
    const page = context.page;
    try {
      const response = await axios.get("/discover/movie", {
        params: { page },
      });
      context.setMovies(response.data.results);
      setTotalCount(response.data.total_pages);
      context.setLoadingMask(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoaded(false);
    }
  };

  const getTVShows = async () => {
    const page = tvContext.page;
    try {
      const response = await axios.get("/discover/tv", {
        params: { page },
      });
      tvContext.setTVShows(response.data.results);
      setTotalCount(response.data.total_pages);
      context.setLoadingMask(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoaded(false);
    }
  };

  useEffect(() => {
    if (type === "movies") {
      getAllMovies();
    } else {
      getTVShows();
    }
  }, [context.page, type]);

  return (
    <MDBContainer className="discover">
      <div className="loading-spinner">
        <LoadingSpinner loading={loaded} />
      </div>
      {type === "movies" ? (
        <MDBRow>
          {context.movies.map((movie) => {
            return (
              <MDBCol size="12" sm="12" md="12" lg="6" key={movie.id}>
                <DeatilsCard result={movie} type="movies" loaded={loaded} />
              </MDBCol>
            );
          })}
        </MDBRow>
      ) : (
        <MDBRow>
          {tvContext.tvshows.map((tv) => {
            return (
              <MDBCol size="12" sm="12" md="12" lg="6" key={tv.id}>
                <DeatilsCard result={tv} tv="tv" loaded={loaded} />
              </MDBCol>
            );
          })}
        </MDBRow>
      )}
      {/* <PaginationComponent
        page={context.page}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
      /> */}
    </MDBContainer>
  );
};
