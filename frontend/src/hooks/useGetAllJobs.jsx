import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAllJobs=async()=>{
            try {
                const res= await axios.get("http://localhost:3000/api/v1/job/get",{
                    withCredentials:true
                });
                console.log(res);
                
                if(res.data.success){
                   dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllAdminJobs
