import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(state => state.job || {});
  const dispatch=useDispatch();
  useEffect(()=>{
   return ()=>{
  dispatch(setSearchedQuery(""))
   }
  },[])
  console.log(allJobs);
  
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-8'>
        <h1 className='font-bold text-2xl my-8 font-serif'>Search Results({allJobs?.length})</h1>
        <div className='grid grid-cols-3 gap-5'>
        {
            allJobs?.map((job)=>{
               return <Job key={job._id} job={job}/>
            })
        }
        </div>
      </div>
    </div>
  )
}

export default Browse
