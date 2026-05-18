import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetJobById = (jobId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/job/${jobId}`, { withCredentials: true });
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