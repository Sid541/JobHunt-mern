import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const APPLICATION_API_END_POINT = import.meta.env.VITE_APPLICATION_API_END_POINT

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F1424] to-[#0B1120] text-gray-200">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-6 relative z-10">
        <h1 className="font-bold text-2xl my-6 text-white tracking-tight">
          Received Submissions (
          <span className="text-[#a855f7]">
            {applicants?.applications?.length || 0}
          </span>)
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;