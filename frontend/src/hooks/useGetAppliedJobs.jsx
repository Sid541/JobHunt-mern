import { setAllAppliedJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { APPLICATION_API_END_POINT } from "../utils/constant";

// 1. Removed "async" from the main hook definition
const useGetAppliedJobs = () => { 
    const dispatch = useDispatch();

    useEffect(() => {
        // 2. This inner function is perfectly fine being async!
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true
                });
            
                if (res.data.success) {
                   dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchAppliedJobs();
    }, [dispatch]); // Added dispatch to dependency array as a best practice
};

export default useGetAppliedJobs;