import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchReviews } from "../../redux/slice";
import { useReview } from "../../hooks";
import { useNavigate } from "react-router-dom";

import { getSingleREview } from "../../redux/slice";
import { useTranslation } from "react-i18next";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, searchReviews: searchRev } = useReview();
  const wrapperRef = useRef(null);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (query && typeof query === "string") {
      dispatch(searchReviews(query.trim()));
      setIsOpen(true);
    } else {
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
      <div className="form-control">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleSearch}
          type="text"
          placeholder={t("search")}
          className="input input-bordered w-24 md:w-auto transition-shadow focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
      </div>

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
