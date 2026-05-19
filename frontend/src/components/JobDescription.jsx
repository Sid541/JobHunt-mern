import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
// ⚡ Fixed relative import path depths using aliases to fix build failures
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSelector } from 'react-redux';
import { ArrowLeft, Briefcase, MapPin, Wallet, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDescription = () => {
    const navigate = useNavigate();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth); 
    
    // Check if user ID is present in the application tracker array
    const isInitiallyApplied = singleJob?.applications?.some(
        (application) => application.applicant === user?._id || application === user?._id
    ) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    useEffect(() => {
        setIsApplied(isInitiallyApplied);
    }, [singleJob, user]);

    const applyJobHandler = async () => {
        // Your async Axios apply post pipeline goes here...
    };

    return (
        <div className="min-h-screen bg-[#0A0F1C] text-gray-200">
            <Navbar />
            <div className="max-w-5xl mx-auto my-10 px-6">
                {/* Back Navigation Bar */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/5"
                >
                    <ArrowLeft size={16} />
                    Back to Listings
                </button>

                <div className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">
                    {/* Header Banner Content */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
                        <div>
                            <span className="bg-purple-900/40 text-purple-400 border border-purple-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                                Premium Opening
                            </span>
                            <h1 className="text-3xl font-bold text-white mt-3">{singleJob?.title || "Position Title"}</h1>
                            
                            <div className="flex flex-wrap items-center gap-3 mt-4">
                                <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/10 shadow-none px-3 py-1 rounded-lg">{singleJob?.position || "N/A"} open positions</Badge>
                                <Badge className="bg-pink-500/10 text-pink-400 border border-pink-500/10 shadow-none px-3 py-1 rounded-lg">{singleJob?.jobType || "Full-Time"}</Badge>
                                <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 shadow-none px-3 py-1 rounded-lg">{singleJob?.salary || "N/A"} LPA</Badge>
                            </div>
                        </div>

                        <Button
                            disabled={isApplied}
                            onClick={applyJobHandler}
                            className={`font-semibold px-6 py-6 rounded-xl transition-all duration-300 shadow-lg ${
                                isApplied 
                                    ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5 shadow-none" 
                                    : "bg-gradient-to-r from-[#632dc0] to-[#4b1fa3] hover:from-[#4b1fa3] hover:to-[#381480] text-white shadow-purple-950/50"
                            }`}
                        >
                            {isApplied ? "Already Applied" : "Apply to Position"}
                        </Button>
                    </div>

                    {/* Main Layout Grid split */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div className="md:col-span-2 space-y-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                Role Overview & Scope
                            </h2>
                            <div className="bg-[#0e1322] border border-white/5 rounded-xl p-6 min-h-[150px] text-gray-400 leading-relaxed">
                                {singleJob?.description || "No job description details specified yet by the recruitment authority."}
                            </div>
                        </div>
                        
                        {/* Job Metrics Sidebar Card elements */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Job Metrics</h3>
                            <div className="bg-[#0e1322] border border-white/5 rounded-xl p-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Briefcase size={18} /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">CORE TARGET PROFILE</p>
                                        <p className="text-sm font-semibold text-white">{singleJob?.title || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg"><MapPin size={18} /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">OPERATIONAL LOCATION</p>
                                        <p className="text-sm font-semibold text-white">{singleJob?.location || "Remote Available"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg"><Wallet size={18} /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">EXPERIENCE PREREQUISITE</p>
                                        <p className="text-sm font-semibold text-white">{singleJob?.experience || "0"} Years Experience</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Users size={18} /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">TOTAL POOL APPLICATIONS</p>
                                        <p className="text-sm font-semibold text-white">{singleJob?.applications?.length || 0} Candidates</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobDescription;