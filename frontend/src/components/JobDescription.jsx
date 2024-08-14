import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Footer from './Footer';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const isApplied= true;
  return (
    <>
    <Navbar/>
    <div className='max-w-7xl mx-auto my-10'>
      <h1 className='font-bold text-xl'>Frontend Developer</h1>
      <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">Positions</Badge>
        <Badge className={"text-[#f83002] font-bold"} variant="ghost">Part Time</Badge>
        <Badge className={"text-blue-900 font-bold"} variant="ghost">24LPA</Badge>
    </div>
    <Button disabled={isApplied} className={`rounded-lg ${isApplied ? "bg-gray-500 cursor-not-allowed" : "bg-[#632dc0] hover:bg-[#402176]"}`}>{isApplied? "Already applied" : "Apply Now"}</Button>
      </div>
      <div>
        <h1 className='border-b-2 border-b-gray-300 font-semibold py-5'>Job Description</h1>
        <div className='my-4'>
            <h1 className='font-bold my-2'>Role: <span className='pl-4 font-normal text-gray-900'>Frontend Developer</span></h1>
            <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Hyderabad</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, beatae.</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>5 yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>10 LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants:<span className='pl-4 font-normal text-gray-800'>5</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>11-08-2024</span></h1>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default JobDescription
