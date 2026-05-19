import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, FileText, CheckCircle, XCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice"; // Make sure this matches your exact Redux slice action name
import { toast } from "sonner";
import axios from "axios";
const APPLICATION_API_END_POINT = import.meta.env.VITE_APPLICATION_API_END_POINT
const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  
  // Local state to manage application changes instantly in the UI
  const [localApplications, setLocalApplications] = useState([]);

  useEffect(() => {
    if (applicants?.applications) {
      setLocalApplications(applicants.applications);
    }
  }, [applicants]);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);

        // Update the local component state dynamically without requiring a page reload
        const updatedApps = localApplications.map((app) => 
          app._id === id ? { ...app, status: status.toLowerCase() } : app
        );
        setLocalApplications(updatedApps);

        // Keep Redux completely synchronized with your local changes
        dispatch(setAllApplicants({ ...applicants, applications: updatedApps }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl overflow-hidden">
      <Table>
        <TableCaption className="text-gray-400 mt-4">A breakdown of recent candidate interaction logs</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-white/10 hover:bg-transparent">
            <TableHead className="text-gray-300 font-semibold">Full Name</TableHead>
            <TableHead className="text-gray-300 font-semibold">Email Address</TableHead>
            <TableHead className="text-gray-300 font-semibold">Contact</TableHead>
            <TableHead className="text-gray-300 font-semibold">Resume Asset</TableHead>
            <TableHead className="text-gray-300 font-semibold">Submission Date</TableHead>
            <TableHead className="text-gray-300 font-semibold">Current Status</TableHead> {/* NEW COLUMN */}
            <TableHead className="text-right text-gray-300 font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localApplications?.length > 0 ? (
            localApplications.map((item) => (
              <TableRow key={item._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                <TableCell className="font-semibold text-white">{item?.applicant?.fullname}</TableCell>
                <TableCell className="text-gray-300">{item?.applicant?.email}</TableCell>
                <TableCell className="text-gray-400">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 hover:underline transition-colors font-medium text-sm"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText size={14} />
                      <span>{item?.applicant?.profile?.resumeOriginalName || "View File"}</span>
                    </a>
                  ) : (
                    <span className="text-gray-500 text-sm">Unavailable</span>
                  )}
                </TableCell>
                <TableCell className="text-gray-300">
                  {item?.createdAt ? item.createdAt.split("T")[0] : 'N/A'}
                </TableCell>
                
                {/* DYNAMIC VISUAL STATUS ACCORDING TO SYSTEM STATE */}
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize border ${
                    item?.status === 'accepted' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : item?.status === 'rejected' 
                      ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                  }`}>
                    {item?.status || 'Pending'}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 bg-[#121826] border border-white/10 rounded-xl shadow-xl p-1 text-gray-200 space-y-0.5">
                      {shortlistingStatus.map((status, index) => (
                        <div 
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-colors text-sm font-medium"
                        >
                          {status === "Accepted" ? (
                            <CheckCircle size={15} className="text-green-400" />
                          ) : (
                            <XCircle size={15} className="text-red-400" />
                          )}
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="7" className="text-center py-8 text-gray-400">
                No applications received yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;