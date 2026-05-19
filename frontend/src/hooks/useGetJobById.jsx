import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const JOB_API_END_POINT = import.meta.env.VITE_JOB_COMPANY_END_POINT

const useGetJobById = (jobId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };
        if (jobId) {
            fetchSingleJob();
        }
    }, [jobId, dispatch]);
};

export default useGetJobById;