import React from 'react'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
import { Label } from './components/ui/label'
import { Filter } from 'lucide-react'

const filterData=[
  {
    filterType:"Location",
    arr:["Delhi","Banglore","Hyderabad","Pune","Noida","Mumbai"]
  },
  {
    filterType:"Industry",
    arr:["Frontend Developer","Backend Developer","Fullstack Developer","Data Analyst"]
  },
  {
    filterType:"Salary",
    arr:["0-4k","40k-1Lakh","1Lakh-5Lakh"]
  },
]
const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <div className='flex items-center gap-1'>
      <h1 className='text-2xl font-serif font-semibold'>Filter Jobs</h1>
      <span><Filter className='text-lg'/></span>
      </div>
      <hr className='mt-3'/>
      <RadioGroup defaultValue="comfortable">
        {
          filterData.map((data,index)=>{
            return <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.arr.map((item,index)=>{
                  return <div className='flex items-center space-x-2 my-2 gap-1 p-1'>
                    <RadioGroupItem value={item}/>
                    <Label>{item}</Label>
                  </div>
                })
              }
            </div>
          })
        }
        
    </RadioGroup>
    </div>
  )
}

export default FilterCard
