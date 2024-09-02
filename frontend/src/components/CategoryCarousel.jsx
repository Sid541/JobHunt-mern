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

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Explore Categories...</h2>
      <div className="relative">
        <Carousel className="relative w-full overflow-hidden">
          <CarouselContent className="flex space-x-4 animate-carousel">
            {categories.concat(categories).map((cat, index) => (
              <CarouselItem
                key={index}
                className="flex-shrink-0 flex-grow-0 basis-1/3 transition-transform transform hover:scale-105"
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  className="w-full py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-blue-600 hover:to-cyan-500 transition-colors"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition-all" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition-all" />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
