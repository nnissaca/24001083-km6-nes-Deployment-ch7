import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPopular } from "./redux/actions/movieActions";

const PopularMovie = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const popular = useSelector((state) => state?.movies.moviePopular);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Jumlah item per halaman
  const totalPages = Math.ceil(popular?.length / itemsPerPage);

  useEffect(() => {
    dispatch(getPopular());
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = popular?.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbersToShow = () => {
    const pageNumbers = [];

    // Menentukan nomor halaman yang akan ditampilkan sesuai dengan aturan yang Anda berikan
    if (totalPages <= 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage > 3) {
        pageNumbers.push(1);
        pageNumbers.push("...");
      }
      for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages);
        i++
      ) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <>
      <div>
        <div className="sticky-header flex items-center justify-between mt-3 w-screen px-5">
          <p className="flex items-center text-5xl text-red-600 text-shadow-black">
            <div
              onClick={() => {
                navigate("/");
              }}
            >
              <strong>Cinephile</strong>
            </div>
          </p>
        </div>
      </div>
      <h1 className="text-center my-3 mt-14 font-bold text-white text-2xl">
        Popular Movie
      </h1>
      <div className="flex justify-center mt-8">
        <button onClick={handleFirstPage} className="px-1 mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M7 17.5q-.213 0-.357-.144T6.5 17V7q0-.213.144-.356t.357-.144t.356.144T7.5 7v10q0 .213-.144.356t-.357.144m6.109-5.5l4.246 4.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16l-4.388-4.389q-.131-.13-.184-.27q-.053-.138-.053-.297t.053-.296t.184-.267l4.388-4.389q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354z"
            ></path>
          </svg>
        </button>
        {getPageNumbersToShow().map((pageNumber, index) => (
          <React.Fragment key={index}>
            {pageNumber === "..." ? (
              <span className="mx-1 mr-3 ml-3" style={{ color: "white" }}>
                {pageNumber}
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 mx-1 mr-2 border-2 ml-2 rounded-2xl ${
                  pageNumber === currentPage
                    ? "bg-white text-black"
                    : " text-white"
                }`}
              >
                {pageNumber}
              </button>
            )}
          </React.Fragment>
        ))}
        <button onClick={handleLastPage} className="mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M10.892 12L6.646 7.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16l4.388 4.389q.131.13.184.27q.053.138.053.297t-.053.296t-.184.268l-4.388 4.388q-.14.14-.345.15q-.203.01-.363-.15t-.16-.354t.16-.354zm6.109-5.5q.212 0 .356.144T17.5 7v10q0 .213-.144.356t-.357.144t-.356-.144T16.5 17V7q0-.213.144-.356t.357-.144"
            ></path>
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-8 m-2 mx-auto p-6">
        {popular
          ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((movie) => (
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
    </>
  );
};
export default PopularMovie;
