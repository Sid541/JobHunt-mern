import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, KeyRound, ShieldAlert, Sparkles } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  }

  const changeRoleHandler = (value) => {
    setInput({ ...input, role: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) {
      return toast.error("Security credential verification requires a role configuration.");
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post("http://localhost:3000/api/v1/user/login", input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message || "Session cluster authorized.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Authentication transmission mismatch.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-gray-200 overflow-x-hidden relative">
      {/* Decorative ambient background blur vectors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <Navbar />
      
      <div className="flex items-center justify-center max-w-7xl mx-auto px-6 py-12 min-h-[85vh]">
        <form 
          onSubmit={submitHandler} 
          className="w-full max-w-md bg-gradient-to-b from-[#11172a] to-[#0F1424] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-md"
        >
          {/* Top Neon Accent Stripe */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <KeyRound className="w-5 h-5" />
            </div>
            <h1 className="font-extrabold text-2xl text-white tracking-tight">Login</h1>
            <p className="text-xs text-gray-400 mt-1">Provide cryptography logs to open session pipeline.</p>
          </div>

          <div className="space-y-4">
            {/* Email Input Field */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="developer@domain.com"
                required
                className="bg-[#0A0F1C]/60 border-white/10 text-white placeholder-gray-600 rounded-xl focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/50 h-11"
              />
            </div>

            {/* Password Input Field */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="••••••••••••"
                required
                className="bg-[#0A0F1C]/60 border-white/10 text-white placeholder-gray-600 rounded-xl focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500/50 h-11"
              />
            </div>

            {/* Role Radio Option Framework Grid */}
            <div className="space-y-2.5 pt-2">
              <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                Role
              </Label>
              
              <RadioGroup 
                value={input.role} 
                onValueChange={changeRoleHandler}
                className="grid grid-cols-2 gap-3 bg-[#0A0F1C]/40 border border-white/5 p-2 rounded-xl"
              >
                {/* Student Variant Choice option block */}
                <div 
                  onClick={() => changeRoleHandler("student")}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border transition-all cursor-pointer ${
                    input.role === "student" 
                      ? 'bg-indigo-500/5 border-indigo-500/30 text-white' 
                      : 'border-transparent hover:bg-white/[0.02] text-gray-400'
                  }`}
                >
                  <RadioGroupItem 
                    value="student" 
                    id="login-student" 
                    className={input.role === "student" ? "border-indigo-500 text-indigo-500" : "border-white/20"} 
                  />
                  <Label htmlFor="login-student" className="text-xs font-semibold cursor-pointer select-none">Student</Label>
                </div>

                {/* Recruiter Variant Choice option block */}
                <div 
                  onClick={() => changeRoleHandler("recruiter")}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border transition-all cursor-pointer ${
                    input.role === "recruiter" 
                      ? 'bg-indigo-500/5 border-indigo-500/30 text-white' 
                      : 'border-transparent hover:bg-white/[0.02] text-gray-400'
                  }`}
                >
                  <RadioGroupItem 
                    value="recruiter" 
                    id="login-recruiter" 
                    className={input.role === "recruiter" ? "border-indigo-500 text-indigo-500" : "border-white/20"} 
                  />
                  <Label htmlFor="login-recruiter" className="text-xs font-semibold cursor-pointer select-none">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Core Action Navigation Activation Deck */}
          <div className="mt-8">
            {loading ? (
              <Button 
                className="w-full h-11 bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed font-semibold"
                disabled
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Login</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-400 text-center mt-5 pt-4 border-t border-white/5">
            Don't have account ?
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium ml-1">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;