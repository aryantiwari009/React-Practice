import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import MoviePage from "./MoviePage";
import SearchPage from "./SearchPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
