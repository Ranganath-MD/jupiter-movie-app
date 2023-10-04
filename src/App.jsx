import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home, Details, Discover, Search } from "./Pages";
import { FilmProvider } from "./context/FilmProvider";
import { TVShowProvider } from "./context/TVShowProvider";

function App() {
  console.log(
    "%cMatinee Movie",
    "color: maroon; font-weight: 900; font-size: 50px; font-family: monospace"
  );
  return (
    <FilmProvider>
      <TVShowProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover/movie/:id" element={<Details />} />
            <Route
              path="/discover/movies"
              element={<Discover type="movies" />}
            />
            <Route path="/discover/tv-shows" element={<Discover type="tv" />} />
            <Route path="/discover/tv-shows/:id" element={<Details />} />
              {/* <Route path="/discover/movie/:id/cast-crew" element={FullCastCrew} /> */}
              {/* <Route path="/discover/tv/:id/cast-crew" element={TVShowCast} /> */}
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Layout>
      </TVShowProvider>
    </FilmProvider>
  );
}

export default App;
