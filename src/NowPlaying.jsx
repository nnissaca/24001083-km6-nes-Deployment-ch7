import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlaying } from "./redux/actions/movieActions";

const NowPlaying = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");
  const [sortedMovies, setSortedMovies] = useState([]);
  const dispatch = useDispatch();
  const nowPlaying = useSelector((state) => state?.movies.movieCarousel);

  useEffect(() => {
    dispatch(getNowPlaying());
  }, [dispatch]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Mengurutkan film berdasarkan pilihan pengurutan
    if (nowPlaying) {
      let sorted = [...nowPlaying];
      if (sortBy === "A-Z") {
        sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === "Z-A") {
        sorted = sorted.sort((a, b) => b.title.localeCompare(a.title));
      }
      setSortedMovies(sorted);
    }
  }, [nowPlaying, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      <div>
        <div className="sticky-header flex items-center justify-between mt-3 w-screen px-5">
          <p className="flex items-center text-5xl text-red-600 text-shadow-black">
            <strong
              onClick={() => {
                navigate("/");
              }}
            >
              Cinephile
            </strong>
          </p>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="mr-5 p-1 rounded-full border-2 border-white bg-red-600 text-white"
          >
            <option value="">Choose</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <button
            onClick={handleScrollToTop}
            className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={36}
              height={36}
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
              >
                <path d="M8.5 16.5L12 13l3.5 3.5m-7-6L12 7l3.5 3.5"></path>
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
      <h1 className="text-center my-3 mt-14 font-bold text-white text-3xl">
        Now Playing Movie
      </h1>
      <div className="grid grid-cols-4 gap-3 mb-8 m-2 mx-auto p-6">
        {sortedMovies.map((movie) => (
          <div
            key={movie.id}
            className="mt-2 rounded-lg flex flex-col max-w[350px] max-sm:min-w-[250px] items-center shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] hover:shadow-xl hover:shadow-red-600 hover:scale-105"
            style={{ height: "100%" }}
          >
            <div
              className="bg-cover min-h-[410px] w-full rounded-md flex flex-col items-center justify-center relative"
              onClick={() => {
                navigate("/detailMovie", { state: { id: movie.id } });
              }}
            >
              <h2 className="font-bold flex absolute left-0 top-4 bg-white p-2 rounded-e-md">
                ⭐<div className="ml-1">{movie?.vote_average.toFixed(1)}</div>
              </h2>
              <img
                className="absolute -z-10 max-h-[420px] object-cover w-full top-0 left-0 filter blur-[4px]"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="max-w-56 rounded-sm"
              />
            </div>
          </div>
        ))}
      </div>
      {/* <button onClick={handleLoadMore}>Load More</button> */}
    </>
  );
};
export default NowPlaying;
