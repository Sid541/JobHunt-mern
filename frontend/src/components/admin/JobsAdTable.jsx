import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const JobsAdTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilteredJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl overflow-hidden">
      <Table>
        <TableCaption className="text-gray-400 mt-4">A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-white/10 hover:bg-transparent">
            <TableHead className="text-gray-300 font-semibold">Company Name</TableHead>
            <TableHead className="text-gray-300 font-semibold">Role</TableHead>
            <TableHead className="text-gray-300 font-semibold">Date Posted</TableHead>
            <TableHead className="text-right text-gray-300 font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs?.length > 0 ? (
            filteredJobs.map((job) => (
              <TableRow key={job._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                <TableCell className="font-medium text-white">{job?.company?.name}</TableCell>
                <TableCell className="text-purple-300 font-medium">{job?.title}</TableCell>
                <TableCell className="text-gray-300">{job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 bg-[#121826] border border-white/10 rounded-xl shadow-xl p-2 text-gray-200 space-y-1">
                      <div
                        onClick={() => navigate(`/admin/jobs/edit/${job._id}`)} // Updated route format
                        className="flex items-center gap-2 px-2 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-colors"
                      >
                        <Edit2 size={15} className="text-cyan-400" />
                        <span className="text-sm font-medium">Edit Job</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 px-2 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-colors"
                      >
                        <Eye size={15} className="text-purple-400" />
                        <span className="text-sm font-medium">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-8 text-gray-400">
                No jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsAdTable;