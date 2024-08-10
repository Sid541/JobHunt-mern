import React from 'react'
import JobCard from './JobCard'

const randomJobs=[1,2,3,4,5,6,7,8,9]
const LatestJobs = () => {
  return (
    <div className='max-w-7xl mx-20 my-20'>
    <h1 className='text-4xl font-bold'><span className='text-[#632dc0]'>Latest and Top </span>Job Openings...</h1>
     <div className='grid grid-cols-3 gap-4 my-7'>
        {
            randomJobs.slice(0,6).map((item, index)=>{
                return <JobCard/>
            })
        }
     </div>
    </div>
  )
}

export default LatestJobs
