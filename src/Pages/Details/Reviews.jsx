import React, { useEffect, useState } from "react";
import { useFilms } from "../../context/FilmProvider";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import avatar from "../../assets/avatar1.png";

export const Reviews = ({ type }) => {
  const [reviews, setReviews] = useState([]);

  const params = useParams();

  useEffect(() => {
    const getreviews = async () => {
      try {
        const reviews = await axios.get(`/${type === "movie" ? "movie" : "tv"}/${params.id}/reviews`)
        setReviews(reviews.data.results);
      } catch (error) {
        console.log(error)
      }
    }

    getreviews()
  }, [])


  return (
    <div>
      {reviews?.length !== 0 ? (
        <div>
          <h2 className="cast-title">Reviews</h2>
          <div className="hr-line"></div>
          <section>
            {reviews?.map((review, i) => {
                return (
                  <div className="review-card" key={i}>
                    <div style={{ display: "flex" }}>
                      <img
                        src={avatar}
                        alt="review-avatar"
                        width="30px"
                        height="30px"
                      />
                      <p className="review-author">{review?.author}</p>
                    </div>
                    <p className="review-content">{review?.content}</p>
                    <a
                      href={review.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="review-url"
                    >
                      Read more here
                    </a>
                  </div>
                );
              })}
          </section>
        </div>
      ) : null}
    </div>
  );
};
