import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from '@/FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { SearchX, SlidersHorizontal } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                const titleMatch = typeof job.title === 'string' && job.title.toLowerCase().includes(searchedQuery.toLowerCase());
                const descriptionMatch = typeof job.description === 'string' && job.description.toLowerCase().includes(searchedQuery.toLowerCase());
                const locationMatch = typeof job.location === 'string' && job.location.toLowerCase().includes(searchedQuery.toLowerCase());

                return titleMatch || descriptionMatch || locationMatch;
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-[#0A0F1C] text-gray-200 overflow-x-hidden">
            <Navbar />
            
            <div className='max-w-7xl mx-auto px-6 mt-8'>
                {/* Header Context Tracking Row */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">Available Pipelines</h1>
                        <p className="text-xs text-gray-400 mt-1">Filter and query live vacancies synchronized across enterprise clusters.</p>
                    </div>
                    {searchedQuery && (
                        <div className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-xl font-medium">
                            Active Query: "{searchedQuery}"
                        </div>
                    )}
                </div>

                <div className='flex flex-col md:flex-row gap-6 items-start'>
                    {/* Filter Card Shell Sidebar Wrapper */}
                    <div className='w-full md:w-[280px] bg-gradient-to-b from-[#11172a] to-[#0F1424] border border-white/5 rounded-2xl p-5 shadow-xl shrink-0'>
                        <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-4 text-white font-bold text-sm tracking-wide uppercase">
                            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
                            <span>Refine Metrics</span>
                        </div>
                        <FilterCard />
                    </div>
                    
                    {/* Active Feed Track Window */}
                    {filterJobs?.length <= 0 ? (
                        <div className='flex-1 flex flex-col items-center justify-center bg-white/[0.01] border border-white/5 rounded-2xl p-16 text-center my-4 backdrop-blur-sm min-h-[45vh]'>
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4 animate-bounce">
                                <SearchX className="w-6 h-6" />
                            </div>
                            <h3 className='font-bold text-xl text-white tracking-tight'>No Log Matches Located</h3>
                            <p className='text-sm text-gray-400 max-w-sm mt-2 leading-relaxed'>
                                We couldn't find any positions matching your specified filters. Try expanding your location or tech stack matrix parameters.
                            </p>
                        </div>
                    ) : (
                        <div className='flex-1 h-[78vh] overflow-y-auto pr-2 pb-8 custom-scrollbar'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                                {filterJobs?.map((job) => (
                                    <Job job={job} key={job._id} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Premium scrollbar styling inject block to keep the UI beautiful */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 99px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.2);
                }
            `}</style>
        </div>
    );
}

export default Jobs;