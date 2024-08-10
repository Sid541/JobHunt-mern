import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';

const randomJobs=[1,2,3,4,5];
const Browse = () => {
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-8'>
        <h1 className='font-bold text-2xl my-8 font-serif'>Search Results({randomJobs.length})</h1>
        <div className='grid grid-cols-3 gap-5'>
        {
            randomJobs.map((item,index)=>{
               return <Job/>
            })
        }
        </div>
      </div>
    </div>
  )
}

export default Browse
