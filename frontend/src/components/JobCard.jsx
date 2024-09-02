import React from 'react';
import { Badge } from './ui/badge';

const JobCard = ({ job }) => {
  return (
    <div className='border border-gray-200 rounded-xl shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer'>
      <div className='flex items-center gap-4 mb-4'>
        <div className='w-12 h-12 rounded-full overflow-hidden border border-gray-300'>
          <img 
            src={job?.company?.logo || 'https://via.placeholder.com/50'} 
            alt={job?.company?.name}
            className='w-full h-full object-cover'
          />
        </div>
        <div>
          <h2 className='text-xl font-semibold text-gray-800'>{job?.company?.name}</h2>
          <p className='text-sm text-gray-500'>{job?.location || 'Location Unknown'}</p>
        </div>
      </div>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-gray-900'>{job?.title || 'Job Title'}</h3>
        <p className='text-sm text-gray-600'>{job?.description || 'No description available'}</p>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position || 'N/A'} Positions</Badge>
        <Badge className='text-[#f83002] font-bold' variant='ghost'>{job?.jobType || 'N/A'}</Badge>
        <Badge className='text-blue-900 font-bold' variant='ghost'>{job?.salary || 'N/A'} LPA</Badge>
      </div>
    </div>
  );
};

export default JobCard;
