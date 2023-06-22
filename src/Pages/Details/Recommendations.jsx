import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { useFilms } from "../../context/FilmProvider";

export const Recommendations = ({ type }) => {
  const context = useFilms();
  const params = useParams();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRec = async () => {
      try {
        const rec = await axios.get(
          `/${type === "movie" ? "movie" : "tv"}/${params.id}/recommendations`
        );
        setRecommendations(rec.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getRec();
  }, []);

  return (
    <MDBRow>
      <MDBCol>
        {!loading && recommendations.length === 0 ? null : (
          <div>
            <h2 className="cast-title">Recommendations</h2>
            <div className="hr-line"></div>

            <section className="hr-card">
              {!loading &&
                recommendations.map((item, i) => {
                  return (
                    <div className="profile-pic" key={i}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                        alt="poster"
                        key={i}
                        className="poster-rec-img"
                      />
                      <div className="edit">
                        <div>
                          <h2 className="txt">
                            {type === "movie" ? item.title : item.name}
                          </h2>
                          <MDBBtn
                            outline
                            size="sm"
                            // onClick={() => handleSuggestMovies(movie)}
                            className="suggest-btn"
                            color="secondary"
                          >
                            {type === "movie" ? "Movie Detail" : "Show Detail"}
                          </MDBBtn>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </section>
          </div>
        )}
      </MDBCol>
    </MDBRow>
  );
};
