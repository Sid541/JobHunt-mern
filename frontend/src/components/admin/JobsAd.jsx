import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import JobsAdTable from './JobsAdTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const JobsAd = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F1424] to-[#0B1120] text-gray-200">
            {/* Soft Ambient Background Glows (Blinking fixed by removing animate-pulse) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Removed 'animate-pulse' */}
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                {/* Removed 'animate-pulse duration-3000' */}
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            </div>

            <div className="relative z-10">
                <Navbar />
                <div className="max-w-6xl mx-auto my-10 px-4">
                    <div className="flex items-center justify-between my-8 backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
                        <Input
                            className="w-fit px-4 py-2 bg-[#141b2d] border-white/10 text-white placeholder-gray-400 focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
                            placeholder="Filter by name, role..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button 
                            className="bg-gradient-to-r from-[#632dc0] to-[#4b1fa3] hover:from-[#4b1fa3] hover:to-[#381480] text-white font-medium px-6 py-2 rounded-xl transition-all shadow-lg shadow-purple-900/30" 
                            onClick={() => navigate("/admin/jobs/create")}
                        >
                            + Add New Job
                        </Button>
                    </div>
                    <JobsAdTable />
                </div>
            </div>
        </div>
    );
};

export default JobsAd;