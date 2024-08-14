import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Graphic Designer",
  "FullSatck Developer",
];
const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-24">
        <CarouselContent>
            { category.map((cat, index) => {
                
               return <CarouselItem className="md:basis-1/2 lg:basis-1/3" id={index}>
                <Button  className="rounded-2xl bg-cyan-700 hover:bg-cyan-800">{cat}</Button>
                </CarouselItem>
         })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
