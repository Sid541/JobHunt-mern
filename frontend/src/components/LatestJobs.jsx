import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto px-6 my-24">
      <h1 className="text-3xl font-extrabold text-white tracking-tight mb-8">
        Latest & Top <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Job Openings</span>
      </h1>
      
      {allJobs?.length <= 0 ? (
        <div className="w-full text-center py-12 rounded-2xl border border-dashed border-white/10 bg-white/5">
          <span className="text-gray-400 text-sm">No new jobs listed at the moment. Please check back later!</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs?.slice(0, 6).map((job) => {
            return <JobCard job={job} key={job._id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;