import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Briefcase, Code, Database, Layout, Terminal } from "lucide-react";

// Structured data allows us to add matching technical icons to make the UI look premium
const categories = [
  { name: "Frontend Developer", icon: <Layout className="w-5 h-5 text-cyan-400" /> },
  { name: "Backend Developer", icon: <Terminal className="w-5 h-5 text-indigo-400" /> },
  { name: "Data Scientist", icon: <Database className="w-5 h-5 text-purple-400" /> },
  { name: "Graphic Designer", icon: <Code className="w-5 h-5 text-pink-400" /> },
  { name: "FullStack Developer", icon: <Briefcase className="w-5 h-5 text-emerald-400" /> },
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-20 px-6">
      <div className="text-center mb-10">
        <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">
          Browse Talent Pools
        </h2>
        <p className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Explore Trending Categories
        </p>
      </div>

      <div className="relative px-12">
        {/* opts={{ loop: true }} enables seamless, non-breaking infinity loops natively via Shadcn */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {categories.map((cat, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3"
              >
                <div className="p-1">
                  <Button
                    onClick={() => searchJobHandler(cat.name)}
                    className="group relative w-full h-24 flex flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-[#161d35] to-[#11172a] border border-white/5 hover:border-indigo-500/40 text-gray-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 overflow-hidden"
                  >
                    {/* Decorative Ambient Background Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon wrapper with smooth scaling micro-interaction */}
                    <div className="p-2 bg-white/5 rounded-xl group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-300">
                      {cat.icon}
                    </div>

                    <span className="text-sm font-semibold tracking-wide">
                      {cat.name}
                    </span>
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Clean, perfectly positioned directional buttons styled contextually into your dark-mix UI */}
          <CarouselPrevious className="absolute -left-2 top-1/2 -translate-y-1/2 w-10 h-10 border-white/10 bg-[#0F1424]/80 text-gray-400 hover:text-white hover:bg-indigo-600 hover:border-transparent rounded-xl transition-all duration-300 shadow-md backdrop-blur-md" />
          <CarouselNext className="absolute -right-2 top-1/2 -translate-y-1/2 w-10 h-10 border-white/10 bg-[#0F1424]/80 text-gray-400 hover:text-white hover:bg-indigo-600 hover:border-transparent rounded-xl transition-all duration-300 shadow-md backdrop-blur-md" />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;