import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post("http://localhost:3000/api/v1/user/login", input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      const data = res.data;

      if (data.success) {
        dispatch(setUser(data.user));
        navigate("/");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex flex-col items-center justify-center flex-grow py-12 px-4'>
        <div className='max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-lg p-8'>
          <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Login</h1>
          <form onSubmit={submitHandler}>
            <div className='mb-4'>
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Enter your email"
                className='mt-1'
              />
            </div>

            <div className='mb-4'>
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter your password"
                className='mt-1'
              />
            </div>

            <div className='mb-6'>
              <Label className='block text-sm font-medium text-gray-700'>Role</Label>
              <RadioGroup className="flex items-center gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1" className="text-gray-800">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2" className="text-gray-800">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <div className='mb-4'>
              {loading ? (
                <Button className="w-full flex items-center justify-center py-2 bg-gray-500 text-white rounded-lg">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full py-2 bg-[#632dc0] hover:bg-[#402176] text-white rounded-lg"
                >
                  Login
                </Button>
              )}
            </div>

            <div className='text-center text-sm text-gray-600'>
              Don't have an account? <Link to="/signup" className='text-blue-600 hover:underline'>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
