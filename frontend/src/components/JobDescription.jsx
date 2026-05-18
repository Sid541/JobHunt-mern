import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { 
  Calendar, 
  Briefcase, 
  Users, 
  MapPin, 
  Layers, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle,
  FileText
} from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(!singleJob);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // Watch for singleJob hydrations to keep user application synchronization locked accurately
  useEffect(() => {
    if (singleJob && user) {
      const isInitiallyApplied = singleJob.applications?.some(
        (application) => application.applicant === user._id
      ) || false;
      setIsApplied(isInitiallyApplied);
    }
  }, [singleJob, user]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/application/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message || "Applied successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Application submission failed");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/v1/job/get/${jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to recover job structural info");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0A0F1C]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Parse requirements to safely display split comma lists
  const structuralRequirements = singleJob?.requirements 
    ? (Array.isArray(singleJob.requirements) 
        ? singleJob.requirements 
        : singleJob.requirements.split(","))
    : [];

  return (
    <div className="relative min-h-screen bg-[#0A0F1C] text-gray-200 overflow-hidden font-sans pb-16">
      
      {/* Premium Atmospheric Ambient Light Blur Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full filter blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full filter blur-[100px] mix-blend-screen pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 relative z-10">
        
        {/* Navigation Action Breadcrumb bar */}
        <button 
          onClick={() => window.history.back()} 
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors group mb-6 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg backdrop-blur-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Listings
        </button>

        {/* Core Segment Wrapper */}
        <div className="bg-[#11172a]/40 border border-white/5 shadow-2xl rounded-3xl backdrop-blur-xl overflow-hidden p-6 sm:p-10">
          
          {/* Header Banner Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/5">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Premium Opening
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {singleJob?.title || "Position Title"}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="text-cyan-400 bg-cyan-400/5 border border-cyan-400/10 font-bold rounded-xl text-xs px-3.5 py-1" variant="none">
                  {singleJob?.position || 'N/A'} open positions
                </Badge>
                <Badge className="text-pink-400 bg-pink-400/5 border border-pink-400/10 font-bold rounded-xl text-xs px-3.5 py-1" variant="none">
                  {singleJob?.jobType || "Full-Time"}
                </Badge>
                <Badge className="text-emerald-400 bg-emerald-400/5 border border-emerald-400/10 font-bold rounded-xl text-xs px-3.5 py-1" variant="none">
                  {singleJob?.salary || 'N/A'} LPA
                </Badge>
              </div>
            </div>

            <div className="shrink-0 pt-2 lg:pt-0">
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 transform active:scale-[0.98] ${
                  isApplied
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-not-allowed shadow-none"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 animate-pulse hover:animate-none"
                }`}
              >
                {isApplied ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Already Applied
                  </span>
                ) : (
                  "Apply to Position"
                )}
              </Button>
            </div>
          </div>

          {/* Detailed Content Grid Layout splits */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            
            {/* Left Content Column (Main Info) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Role Overview */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Role Overview & Scope
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed bg-white/[0.01] border border-white/5 p-5 rounded-2xl shadow-inner">
                  {singleJob?.description || "No job description details specified yet by the recruitment authority."}
                </p>
              </div>

              {/* Requirements Specifications */}
              {structuralRequirements.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    Key Requirements & Skillset
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {structuralRequirements.map((req, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-2.5 bg-white/[0.01] border border-white/5 p-3.5 rounded-xl text-sm text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 shrink-0" />
                        <span>{req.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Sticky Metrics Panel Card */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 px-1">Job Metrics</h2>
              
              <div className="bg-[#161c30]/60 border border-white/5 rounded-2xl p-5 space-y-4 shadow-xl">
                
                <div className="flex items-center gap-3.5 border-b border-white/5 pb-3.5">
                  <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <Layers className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Core Target Profile</p>
                    <p className="text-sm text-white font-semibold mt-0.5">{singleJob?.title || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 border-b border-white/5 pb-3.5">
                  <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Operational Location</p>
                    <p className="text-sm text-white font-semibold mt-0.5">{singleJob?.location || 'Remote Available'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 border-b border-white/5 pb-3.5">
                  <div className="p-2 bg-pink-500/10 border border-pink-500/20 rounded-xl">
                    <Briefcase className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Experience Prerequisite</p>
                    <p className="text-sm text-white font-semibold mt-0.5">{singleJob?.experience || "0"} Years Experience</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 border-b border-white/5 pb-3.5">
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <Users className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Total Pool Applications</p>
                    <p className="text-sm text-white font-semibold mt-0.5">{singleJob?.applications?.length || 0} Candidates</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <Calendar className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Publication Timestamp</p>
                    <p className="text-sm text-white font-semibold mt-0.5">
                      {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "Just Now"}
                    </p>
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