import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Layers } from 'lucide-react';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(state => state.job || {});
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, [dispatch]);
  
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-gray-200 pb-12">
      <Navbar />
      
      <div className='max-w-7xl mx-auto px-6 my-10'>
        {/* Dynamic Metric Counter Card Banner */}
        <div className="bg-gradient-to-r from-[#11162b] to-[#0d1222] border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className='font-extrabold text-2xl text-white tracking-tight'>
                Exploratory Search Index
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Real-time snapshot showing all available openings globally open for processing.
              </p>
            </div>
          </div>
          
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-center shrink-0 w-full sm:w-auto">
            <span className="text-2xl font-black text-white">{allJobs?.length || 0}</span>
            <span className="text-xs text-gray-400 font-medium tracking-wide block sm:inline sm:ml-2 uppercase">Nodes Found</span>
          </div>
        </div>

        {/* Core Card Feed Grid */}
        {allJobs?.length <= 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-[#11172a]/20">
            <p className="text-sm text-gray-500 italic">No historical open nodes pulled from the registry.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {allJobs?.map((job) => {
               return <Job key={job._id} job={job} />
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;