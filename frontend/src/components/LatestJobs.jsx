import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import "../App.css"

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-20 my-20">
      <h1 className='text-4xl font-bold animate-title'>
      <span className='text-[#632dc0]'>Latest and Top </span>Job Openings...
    </h1>
      <div className="grid grid-cols-3 gap-4 my-7">
        {allJobs?.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => {
            return <JobCard job={job} key={job._id} />;
          })
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
