import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchReviews } from "../../redux/slice";
import { useReview } from "../../hooks";
import { Typography, Autocomplete, Box, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../atoms";
import { getSingleREview } from "../../redux/slice";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, searchReviews: searchRev } = useReview();
  const wrapperRef = useRef(null);

  console.log(query);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (query && typeof query === "string") {
      dispatch(searchReviews(query.trim()));
      setIsOpen(true);
    } else {
      console.log("araa stringi");
      setIsOpen(false);
    }
  };
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleSearch}
        type="text"
        placeholder="Search"
        className="input input-bordered w-full px-2 py-1 md:px-4 md:py-2 transition-shadow focus:ring-2 focus:ring-indigo-400 focus:outline-none"
      />
      {isOpen && (
        <ul className="absolute left-0 z-10 w-full mt-1 overflow-hidden bg-white border border-gray-300 rounded shadow-lg">
          {loading === "loading" && (
            <li className="px-4 py-2 text-gray-500">Loading...</li>
          )}
          {searchRev.map((review) => (
            <li
              onClick={() => {
                dispatch(getSingleREview(review._id));
                navigate(`/singleReview/${review._id}`);
              }}
              key={review._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in "
            >
              <h1 className="text-gray-800"> {review.title}</h1>
              <img className="h-12 w-auto object-cover" src={review.image} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
