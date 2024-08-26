import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {

  const navigate=useNavigate();
  const daysAgo=(mongodbTime)=>{
   const createdAt = new Date(mongodbTime);
   const currentTime=new Date();
   const timeDiff=currentTime-createdAt;
   return Math.floor(timeDiff/(1000*24*60*60))
  }
  return (
    <div className='p-5 rounded-lg shadow-xl bg-white border border-gray-200 '>
      <div className='flex justify-between'>
      <p className='text-sm text-gray-500'>{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}</p>
      <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
       <Avatar>
        <AvatarImage src={job?.company?.logo}>

        </AvatarImage>
       </Avatar>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
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
    <div className='flex items-center gap-4 mt-4'>
      <Button variant="outline" className="rounded-3xl" onClick={()=> navigate(`/description/${job?._id}`)}>Details</Button>
      <Button className="bg-[#632dc0] rounded-3xl hover:bg-[#402176]">Save for Later</Button>
    </div>
    </div>
  )
}

export default Job
