import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import "../App.css"; // Make sure to import the CSS file

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-6">
        <span className="mx-auto px-6 py-3 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 text-[#f83002] font-extrabold text-3xl shadow-lg border border-gray-300 my-3 animate-fadeIn">
          NO.1 Job Search Platform
        </span>

        <h1 className="text-4xl font-bold animate-slideIn">
          Search, <span className="text-[#632dc0]">Apply</span>, and <br />
          Get Your <span className="text-[#632dc0]"> Job</span>
        </h1>
        <p className="font-semibold mt-4 text-gray-600 animate-zoomIn">
          Unlock Your Future: Find the Job You’ve Been Searching For.
        </p>
        <div className="flex w-1/2 shadow-lg border border-gray-200 pl-6 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find Your Job here..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-[#632dc0] hover:bg-[#402176] rounded-e-3xl rounded-s-none"
          >
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
