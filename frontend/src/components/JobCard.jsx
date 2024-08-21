import React from 'react'
import { Badge } from './ui/badge'

const JobCard = ({job}) => {
  return (
    <div className=' border border-gray-200 rounded-xl shadow-xl p-5 cursor-pointer'>
    <div>
      <h1 className='font-medium text-lg '>{job?.company?.name}</h1>
      <p className='text-sm text-gray-500'>India</p>
    </div>
    <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
    </div>
    <div className='flex items-center gap-2 mt-4'>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={"text-[#f83002] font-bold"} variant="ghost">{job?.jobType}</Badge>
        <Badge className={"text-blue-900 font-bold"} variant="ghost">{job?.salary}LPA</Badge>
    </div>
    </div>
  )
}

export default JobCard
