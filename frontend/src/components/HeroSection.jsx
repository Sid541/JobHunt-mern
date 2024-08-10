import React from 'react'
import { Button } from './ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-6'>
      <span className=' mx-auto px-8 py-2 rounded-full bg-gray-200 text-[#f83002] font-bold text-2xl my-3'>NO.1 Job Search Platform</span>
      <h1 className='text-4xl font-bold'>Search, Apply & <br/>Get Your <span className='text-[#632dc0]'>Dream Job</span></h1>
      <p className='font-semibold text-[#f83002]'>Unlock Your Future: Find the Job You’ve Been Searching For.
      </p>
      <div className='flex w-1/2  shadow-lg border border-gray-200 pl-6 rounded-full items-center gap-4 mx-auto'>
      
        <input type="text" placeholder='Find Your Job here...' className='outline-none border-none w-full' />
        <Button className="bg-[#632dc0] hover:bg-[#402176] rounded-e-3xl rounded-s-none"><Search/></Button>
      </div>
    </div>
    </div>
  )
}

export default HeroSection
