import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../utils/axios";
import { useShows } from "../../context/TVShowProvider";
import "../../styles/home.css";

export const TrendingTVToday = () => {
  const context = useShows();
  const navigate = useNavigate();

  useEffect(() => {
    const getTrendingShows = async () => {
      try {
        const response = await axios.get("/trending/tv/day");
        context.setLoading(true);
        context.setTrendingTvShowToday(response.data.results);
      } catch {
        console.log("failed to load trending shows");
      }
    };

    getTrendingShows();
  }, []);

  const handleTrendingShow = (tv) => {
    navigate(`/discover/tv-shows/${tv.id}`);
  };

  return (
    <div>
      <section className="hr_popular_cards">
        {context.loading &&
          context.trendingTvshowToday.map((tv, i) => {
            return (
              <div
                className="sp_card"
                key={i}
                onClick={() => handleTrendingShow(tv)}
              >
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                    alt="poster"
                    key={i}
                    className="backdrop"
                  />
                </div>

                <p className="p_movie_title">{tv.name}</p>
                <p className="p_date">{tv.first_air_date}</p>
              </div>
            );
          })}
      </section>
    </div>
  );
};
