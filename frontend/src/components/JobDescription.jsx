import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useSelector } from 'react-redux'; // Assuming your logged-in user state is in Redux

const JobDescription = () => {
    // 1. Grab the single job details and logged-in user profile from your store
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth); 
    
    // 2. Check if the user has already applied to this specific job
    // The backend stores application IDs or User IDs inside the job's applications array
    const isInitiallyApplied = singleJob?.applications?.some(
        (application) => application.applicant === user?._id || application === user?._id
    ) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    // Sync local state if singleJob changes asynchronously
    useEffect(() => {
        setIsApplied(isInitiallyApplied);
    }, [singleJob, user]);

    const applyJobHandler = async () => {
        // Your existing handleApply function logic goes here...
        // e.g., axios.get(`/api/v1/application/apply/${jobId}`)
        // On success: setIsApplied(true)
    };

    return (
        <div className="min-h-screen bg-[#0A0F1C] text-gray-200 p-8">
            <div className="max-w-5xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">
                
                {/* Header Section */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div>
                        <span className="bg-purple-900/40 text-purple-400 border border-purple-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                            Premium Opening
                        </span>
                        <h1 className="text-3xl font-bold text-white mt-3">{singleJob?.title || "Position Title"}</h1>
                        
                        <div className="flex items-center gap-3 mt-4">
                            <Badge className="bg-cyan-500/10 text-cyan-400 border-none">{singleJob?.position || "N/A"} open positions</Badge>
                            <Badge className="bg-pink-500/10 text-pink-400 border-none">{singleJob?.jobType || "Full-Time"}</Badge>
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-none">{singleJob?.salary || "N/A"} LPA</Badge>
                        </div>
                    </div>

                    {/* ⚡ THE FIX: Conditional rendering based on isApplied state */}
                    <Button
                        disabled={isApplied}
                        onClick={applyJobHandler}
                        className={`font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg ${
                            isApplied 
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed shadow-none" 
                                : "bg-gradient-to-r from-[#632dc0] to-[#4b1fa3] hover:from-[#4b1fa3] hover:to-[#381480] text-white shadow-purple-950/50"
                        }`}
                    >
                        {isApplied ? "Already Applied" : "Apply to Position"}
                    </Button>
                </div>

                {/* Body Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            📝 Role Overview & Scope
                        </h2>
                        <div className="bg-white/5 border border-white/5 rounded-xl p-6 min-h-[150px] text-gray-400">
                            {singleJob?.description || "No job description details specified yet by the recruitment authority."}
                        </div>
                    </div>
                    
                    {/* Job Metrics Sidebar */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Job Metrics</h3>
                        {/* Render your metric items (Location, Experience, etc.) here */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JobDescription;