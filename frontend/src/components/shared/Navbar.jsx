import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import {
  faHouse,
  faWindowMaximize,
  faBriefcase,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link} from "react-router-dom";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
    const {user}= useSelector(store=>store.auth)
  return (
    <>
      <div className="bg-white">
        <div className="flex justify-between items-center max-w-10xl h-14 shadow-xl p-4 mb-4 bg-white rounded-md">
          <Link to="/"><h1 className="text-2xl font-bold">
            Job<span className="text-[#f83002]">Hunt</span>
            <span className="text-md mx-1">
              <FontAwesomeIcon icon={faSuitcase} />
            </span>
          </h1>
          </Link>
          <div className="flex items-center gap-10">
            <ul className="flex font-medium items-center gap-7 cursor-pointer ">
              <li className="hover:text-[#5426a3]">
                <Link to="/">
                <span className="text-sm mx-1">
                  <FontAwesomeIcon icon={faHouse} />
                </span>
                Home
                </Link>
              </li>
              <li className="hover:text-[#5426a3]">
              <Link to="/jobs">
                <span className="text-sm mx-1">
                  <FontAwesomeIcon icon={faBriefcase} />
                </span>
                Jobs
                </Link>
              </li>
              <li className="hover:text-[#5426a3]">
                <Link to="/browse">
                <span className="text-sm mx-1">
                  <FontAwesomeIcon icon={faWindowMaximize} />
                </span>
                Browse
                </Link>
              </li>
            </ul>
            {
           !user ?(
            <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="outline" className="hover:bg-slate-200 rounded-3xl">Login</Button></Link>
                <Link to="/signup"><Button className="bg-[#632dc0] hover:bg-[#402176] rounded-3xl">SignUp</Button></Link>
            </div>
           ): (
            <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              
                <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Siddharth</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet 
                    </p>
                  </div>
                </div>
                <div className="my-2 flex flex-col text-gray-600">
                <div className="flex w-fit items-center cursor-pointer">
                  <User2/>
                  <Link to="/profile"><Button variant="link" className="mx-auto">View Profile</Button></Link>
                </div>
                <div className="flex w-fit items-center cursor-pointer">
                  <LogOut/>
                <Button variant="link">Logout</Button>
                </div>
                </div>
            </PopoverContent>
          </Popover>
           )
            }
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
