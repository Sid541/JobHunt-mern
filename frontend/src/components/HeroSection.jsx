import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="flex flex-col gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-cyan-400 font-bold text-xs tracking-wider uppercase shadow-inner shadow-indigo-500/5 mb-6 animate-pulse">
            ✨ No.1 Job Search Platform
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Search, <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Apply</span>, and <br />
          Get Your <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Dream Job</span>
        </h1>
        
        <p className="max-w-xl mx-auto font-medium mt-2 text-gray-400 text-base md:text-lg">
          Unlock Your Future: Find the job you have been searching for with tech-driven, targeted matching tools.
        </p>

        <div className="flex w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-md p-1.5 rounded-full items-center gap-2 mx-auto mt-8 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-300 shadow-2xl">
          <div className="flex items-center flex-1 pl-4 text-gray-400">
            <Search size={20} className="text-gray-400 shrink-0 mr-2" />
            <input
              type="text"
              placeholder="Roles, tech stack, or companies..."
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none bg-transparent w-full text-white placeholder-gray-500 text-sm md:text-base py-2"
            />
          </div>
          <Button
            onClick={searchJobHandler}
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-medium rounded-full px-6 py-6 h-auto shadow-md shadow-indigo-500/20 transition-all duration-300"
          >
            Find Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;