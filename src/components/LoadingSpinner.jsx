import React, { useContext } from "react";
import { GuardSpinner } from "react-spinners-kit";
import { useFilms } from "../context/FilmProvider";

export const LoadingSpinner = () => {
  const context = useFilms();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GuardSpinner size={60} color="#686769" loading={context.loadingMask} />
    </div>
  );
};

