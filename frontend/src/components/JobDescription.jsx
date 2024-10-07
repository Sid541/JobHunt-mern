import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/application/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/job/get/${jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{singleJob?.title}</h1>
          <div className="flex items-center gap-3 mt-4">
            <Badge className="text-blue-600 font-medium" variant="ghost">
              {singleJob?.postion} Positions
            </Badge>
            <Badge className="text-red-500 font-medium" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-green-600 font-medium" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`px-6 py-2 rounded-md ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#632dc0] hover:bg-[#402176] text-white"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h2 className="text-xl font-semibold border-b border-gray-200 pb-3 mb-6">
        Job Description
      </h2>
      
      <div className="space-y-4 text-gray-700">
        <h3 className="text-lg font-medium">
          Role:{" "}
          <span className="font-normal">{singleJob?.title}</span>
        </h3>
        <h3 className="text-lg font-medium">
          Location:{" "}
          <span className="font-normal">{singleJob?.location}</span>
        </h3>
        <h3 className="text-lg font-medium">
          Description:{" "}
          <span className="font-normal">{singleJob?.description}</span>
        </h3>
        <h3 className="text-lg font-medium">
          Experience:{" "}
          <span className="font-normal">{singleJob?.experience} yrs</span>
        </h3>
        <h3 className="text-lg font-medium">
          Salary:{" "}
          <span className="font-normal">{singleJob?.salary} LPA</span>
        </h3>
        <h3 className="text-lg font-medium">
          Total Applicants:{" "}
          <span className="font-normal">{singleJob?.applications?.length}</span>
        </h3>
        <h3 className="text-lg font-medium">
          Posted Date:{" "}
          <span className="font-normal">{singleJob?.createdAt.split("T")[0]}</span>
        </h3>
      </div>
    </div>
  );
};

export default JobDescription;
