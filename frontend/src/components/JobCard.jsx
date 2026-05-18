import React from 'react';
import { Badge } from './ui/badge';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const JobCard = ({ job }) => {
  const navigate = useNavigate(); // 2. Initialize the hook

  return (
    <div 
      // 3. Add the onClick handler pointing to the dynamic route template
      onClick={() => job?._id && navigate(`/description/${job._id}`)} 
      className='group relative border border-white/5 rounded-2xl p-6 bg-gradient-to-b from-[#131930] to-[#0F1424] hover:border-indigo-500/30 transition-all duration-300 shadow-xl hover:shadow-indigo-500/5 cursor-pointer overflow-hidden'
    >
      {/* Absolute micro shadow glow on component hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/[0.02] to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className='flex items-center gap-4 mb-5 relative z-10'>
        <div className='w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-[#0A0F1C] flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform'>
          <img 
            src={job?.company?.logo || 'https://via.placeholder.com/50'} 
            alt={job?.company?.name}
            className='w-full h-full object-contain rounded-md'
          />
        </div>
        <div>
          <h2 className='text-lg font-bold text-white tracking-wide group-hover:text-indigo-400 transition-colors'>{job?.company?.name}</h2>
          <p className='text-xs text-gray-400 flex items-center gap-1 mt-0.5'>
            <MapPin className="w-3 h-3 text-indigo-400" />
            {job?.location || 'Remote'}
          </p>
        </div>
      </div>

      <div className='mb-5 relative z-10'>
        <h3 className='text-base font-bold text-gray-200 tracking-tight group-hover:text-white transition-colors mb-2'>{job?.title || 'Job Title'}</h3>
        <p className='text-xs text-gray-400 leading-relaxed line-clamp-2'>{job?.description || 'No description available'}</p>
      </div>

      <div className='flex flex-wrap gap-2 pt-2 border-t border-white/5 relative z-10'>
        <Badge className='text-cyan-400 bg-cyan-400/5 border border-cyan-400/10 font-semibold rounded-lg text-xs px-2.5 py-0.5' variant='none'>
          {job?.position || 'N/A'} Positions
        </Badge>
        <Badge className='text-pink-400 bg-pink-400/5 border border-pink-400/10 font-semibold rounded-lg text-xs px-2.5 py-0.5' variant='none'>
          {job?.jobType || 'N/A'}
        </Badge>
        <Badge className='text-indigo-400 bg-indigo-400/5 border border-indigo-400/10 font-semibold rounded-lg text-xs px-2.5 py-0.5' variant='none'>
          {job?.salary || 'N/A'} LPA
        </Badge>
      </div>
    </div>
  );
};

export default JobCard;