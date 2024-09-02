import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faHouse,
  faWindowMaximize,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/logout", 
        { withCredentials: true }
      );
      console.log(res.data);
      
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Function to determine if the link is active
  const isActive = (path) => location.pathname === path ? 'text-[#5426a3] font-bold' : 'hover:text-[#5426a3]';

  // Function to get initials from the full name
  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center max-w-10xl h-14 shadow-xl p-4 mb-4 bg-white rounded-md">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#f83002]">Hunt</span>
            <span className="text-md mx-1">
              <FontAwesomeIcon icon={faSuitcase} />
            </span>
          </h1>
        </Link>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-7 cursor-pointer">
            {user && user.role === "recruiter" ? (
              <>
                <li className={`text-sm ${isActive('/admin/companies')}`}>
                  <Link to="/admin/companies">
                    <span className="mx-1">
                      <FontAwesomeIcon icon={faHouse} />
                    </span>
                    Companies
                  </Link>
                </li>
                <li className={`text-sm ${isActive('/admin/jobs')}`}>
                  <Link to="/admin/jobs">
                    <span className="mx-1">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </span>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className={`text-sm ${isActive('/')}`}>
                  <Link to="/">
                    <span className="mx-1">
                      <FontAwesomeIcon icon={faHouse} />
                    </span>
                    Home
                  </Link>
                </li>
                <li className={`text-sm ${isActive('/jobs')}`}>
                  <Link to="/jobs">
                    <span className="mx-1">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </span>
                    Jobs
                  </Link>
                </li>
                <li className={`text-sm ${isActive('/browse')}`}>
                  <Link to="/browse">
                    <span className="mx-1">
                      <FontAwesomeIcon icon={faWindowMaximize} />
                    </span>
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  {user?.profile?.profilePhoto ? (
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  ) : (
                    <AvatarFallback className="bg-[#d61a6e] text-white">
                      {getInitials(user?.fullname)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pointer">
                    {user?.profile?.profilePhoto ? (
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname}
                      />
                    ) : (
                      <AvatarFallback className="bg-[#d61a6e] text-white">
                        {getInitials(user?.fullname)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="my-2 flex flex-col text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center cursor-pointer">
                      <User2 />
                      <Link to="/profile">
                        <Button variant="link" className="mx-auto">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div className="flex w-fit items-center cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="hover:bg-slate-200 rounded-3xl"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#632dc0] hover:bg-[#402176] rounded-3xl">
                  SignUp
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
