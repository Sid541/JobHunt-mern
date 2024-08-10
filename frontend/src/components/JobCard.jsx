import React from 'react'
import { Badge } from './ui/badge'

const JobCard = () => {
  return (
    <div className=' border border-gray-200 rounded-xl shadow-xl p-5 cursor-pointer'>
    <div>
      <h1 className='font-medium text-lg '>Comapny Name</h1>
      <p className='text-sm text-gray-500'>India</p>
    </div>
    <div>
        <h1 className='font-bold text-lg my-2'>Job Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
    <div className='flex items-center gap-2 mt-4'>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">Positions</Badge>
        <Badge className={"text-[#f83002] font-bold"} variant="ghost">Part Time</Badge>
        <Badge className={"text-blue-900 font-bold"} variant="ghost">24LPA</Badge>
    </div>
    </div>
  )
}

export default JobCard
