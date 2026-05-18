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
import {USER_API_END_POINT} from "@/utils/constant";

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, 
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Upgraded active text tracking indicator styling contextual to dark theme
  const isActive = (path) => 
    location.pathname === path 
      ? 'text-indigo-400 font-bold drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]' 
      : 'text-gray-400 hover:text-white transition-colors';

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0A0F1C]/80 backdrop-blur-md">
      <div className="flex justify-between items-center max-w-7xl h-16 mx-auto px-6">
        <Link to="/">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Job<span className="text-indigo-500">Hunt</span>
            <span className="text-sm text-cyan-400 ml-1.5">
              <FontAwesomeIcon icon={faSuitcase} />
            </span>
          </h1>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-7 cursor-pointer">
            {user && user.role === "recruiter" ? (
              <>
                <li className={`text-sm flex items-center gap-1.5 ${isActive('/admin/companies')}`}>
                  <FontAwesomeIcon icon={faHouse} className="text-xs" />
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className={`text-sm flex items-center gap-1.5 ${isActive('/admin/jobs')}`}>
                  <FontAwesomeIcon icon={faBriefcase} className="text-xs" />
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className={`text-sm flex items-center gap-1.5 ${isActive('/')}`}>
                  <FontAwesomeIcon icon={faHouse} className="text-xs" />
                  <Link to="/">Home</Link>
                </li>
                <li className={`text-sm flex items-center gap-1.5 ${isActive('/jobs')}`}>
                  <FontAwesomeIcon icon={faBriefcase} className="text-xs" />
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className={`text-sm flex items-center gap-1.5 ${isActive('/browse')}`}>
                  <FontAwesomeIcon icon={faWindowMaximize} className="text-xs" />
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer ring-2 ring-white/10 hover:ring-indigo-500/50 transition-all">
                  {user?.profile?.profilePhoto ? (
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  ) : (
                    <AvatarFallback className="bg-indigo-600 text-white font-semibold">
                      {getInitials(user?.fullname)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-[#11172a] border border-white/10 text-gray-200 rounded-2xl shadow-2xl backdrop-blur-xl mt-2">
                <div className="flex gap-3 items-center pb-3 border-b border-white/5">
                  <Avatar className="ring-1 ring-white/10">
                    {user?.profile?.profilePhoto ? (
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    ) : (
                      <AvatarFallback className="bg-indigo-600 text-white font-semibold">
                        {getInitials(user?.fullname)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-white text-sm">{user?.fullname}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                      {user?.profile?.bio || "No bio added yet"}
                    </p>
                  </div>
                </div>
                <div className="pt-2 flex flex-col gap-1">
                  {user && user.role === "student" && (
                    <Link to="/profile" className="flex items-center gap-2 px-2 py-2 hover:bg-white/5 rounded-xl text-sm text-gray-300 hover:text-white transition-colors">
                      <User2 className="w-4 h-4 text-indigo-400" />
                      <span>View Profile</span>
                    </Link>
                  )}
                  <button onClick={logoutHandler} className="flex items-center gap-2 px-2 py-2 w-full text-left hover:bg-red-500/10 rounded-xl text-sm text-gray-400 hover:text-red-400 transition-colors">
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Logout</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-indigo-600/20 transition-all">
                  Sign Up
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