import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Job = () => {
  return (
    <div className='p-5 rounded-lg shadow-xl bg-white border border-gray-200 '>
      <div className='flex justify-between'>
      <p className='text-sm text-gray-500'>2 days ago</p>
      <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
      <Button>
       <Avatar>
        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqQTxgK4s6dLvXDjdU2ptgqQE2ty3g2iapSwm6NxGF9ZXkgXg4qqkzGr8FfTiQD0g9afw&usqp=CAU">

        </AvatarImage>
       </Avatar>
      </Button>
      <div>
        <h1 className='font-medium text-lg'>Company Name</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam ipsam nulla culpa recusandae sunt eum asperiores velit ut.</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">Positions</Badge>
        <Badge className={"text-[#f83002] font-bold"} variant="ghost">Part Time</Badge>
        <Badge className={"text-blue-900 font-bold"} variant="ghost">24LPA</Badge>
    </div>
    <div className='flex items-center gap-4 mt-4'>
      <Button variant="outline" className="rounded-3xl">Details</Button>
      <Button className="bg-[#632dc0] rounded-3xl hover:bg-[#402176]">Save for Later</Button>
    </div>
    </div>
  )
}

export default Job
