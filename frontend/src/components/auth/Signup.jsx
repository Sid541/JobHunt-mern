import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, UserPlus, ShieldCheck, UploadCloud } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  // Protect route if user session exists
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeRoleHandler = (value) => {
    setInput({ ...input, role: value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) {
      return toast.error("Please configure an analytical authorization role.");
    }
    
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post("http://localhost:3000/api/v1/user/register", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message || "Profile array registered.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration cluster compilation failed.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-gray-200 overflow-x-hidden relative">
      {/* Decorative ambient background blur vectors */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto px-6 py-10 min-h-[85vh]">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg bg-gradient-to-b from-[#11172a] to-[#0F1424] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-md"
        >
          {/* Top Neon Accent Stripe */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

          {/* Form Header */}
          <div className="text-center mb-6">
            <div className="mx-auto w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
              <UserPlus className="w-5 h-5" />
            </div>
            <h1 className="font-extrabold text-2xl text-white tracking-tight">Register First</h1>
            <p className="text-xs text-gray-400 mt-1">Register new administrative parameters onto the tracking index.</p>
          </div>

          <div className="space-y-4">
            {/* Grid Array Layout for Personal Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</Label>
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="Siddharth"
                  required
                  className="bg-[#0A0F1C]/60 border-white/10 text-white placeholder-gray-600 rounded-xl focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/50 h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</Label>
                <Input
                  type="text"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="98765XXXXX"
                  required
                  className="bg-[#0A0F1C]/60 border-white/10 text-white placeholder-gray-600 rounded-xl focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/50 h-10"
                />
              </div>
            </div>

            {/* Email Field Panel */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="siddharth@cluster.com"
                required
                className="bg-[#0A0F1C]/60 border-white/10 text-white placeholder-gray-600 rounded-xl focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/50 h-10"
              />
            </div>

            {/* Password Field Panel */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="••••••••••••"
                required
                className="bg-[#0A0F1C]/60 border-white/10 text-white placeholder-gray-600 rounded-xl focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/50 h-10"
              />
            </div>

            {/* Role Custom Flex Box Configurator */}
            <div className="space-y-2 pt-1">
              <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                Operational Role Assignment
              </Label>
              
              <RadioGroup 
                value={input.role} 
                onValueChange={changeRoleHandler}
                className="grid grid-cols-2 gap-3 bg-[#0A0F1C]/40 border border-white/5 p-2 rounded-xl"
              >
                <div 
                  onClick={() => changeRoleHandler("student")}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                    input.role === "student" 
                      ? 'bg-cyan-500/5 border-cyan-500/30 text-white' 
                      : 'border-transparent hover:bg-white/[0.02] text-gray-400'
                  }`}
                >
                  <RadioGroupItem 
                    value="student" 
                    id="signup-student" 
                    className={input.role === "student" ? "border-cyan-500 text-cyan-500" : "border-white/20"} 
                  />
                  <Label htmlFor="signup-student" className="text-xs font-semibold cursor-pointer select-none">Student</Label>
                </div>

                <div 
                  onClick={() => changeRoleHandler("recruiter")}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                    input.role === "recruiter" 
                      ? 'bg-cyan-500/5 border-cyan-500/30 text-white' 
                      : 'border-transparent hover:bg-white/[0.02] text-gray-400'
                  }`}
                >
                  <RadioGroupItem 
                    value="recruiter" 
                    id="signup-recruiter" 
                    className={input.role === "recruiter" ? "border-cyan-500 text-cyan-500" : "border-white/20"} 
                  />
                  <Label htmlFor="signup-recruiter" className="text-xs font-semibold cursor-pointer select-none">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            {/* File Avatar Input Pipeline Panel */}
            <div className="pt-2">
              <div className="bg-[#0A0F1C]/40 border border-white/5 hover:border-white/10 transition-colors p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                    <UploadCloud className="w-4 h-4" />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-white block">Profile Photo</Label>
                    <span className="text-[10px] text-gray-500 block mt-0.5">Upload your picture</span>
                  </div>
                </div>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer max-w-[180px] bg-white/5 text-xs text-gray-300 border-white/10 file:bg-indigo-600 file:hover:bg-indigo-500 file:text-white file:border-none file:text-[11px] file:font-semibold file:px-2.5 file:h-full file:-ml-3 rounded-lg h-9"
                />
              </div>
            </div>
          </div>

          {/* Action Submission Grid Array Trigger */}
          <div className="mt-6">
            {loading ? (
              <Button 
                className="w-full h-11 bg-cyan-600/50 text-cyan-200 border border-cyan-500/30 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed font-semibold"
                disabled
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Registering...</span>
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-600/10 transition-all"
              >
                 Register
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-400 text-center mt-5 pt-4 border-t border-white/5">
            Already have an account ?
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium ml-1">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;