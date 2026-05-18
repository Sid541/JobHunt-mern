import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, Camera, FileText, Sparkles } from "lucide-react"; 
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileBox from "./UpdateProfileBox";
import { useSelector, useDispatch } from "react-redux"; 
import { setUser } from "@/redux/authSlice"; 
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";

const Profile = () => {
  useGetAppliedJobs();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false); 
  const { user } = useSelector(store => store.auth);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); 

    try {
      setUploading(true);
      const res = await axios.post(`{USER_API_END_POINT}/profile/update-photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile photo updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to upload photo.");
    } finally {
      setUploading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-gray-200 pb-12">
      <Navbar />
      
      {/* Profile Core Card */}
      <div className="max-w-5xl mx-auto bg-gradient-to-b from-[#11172a] to-[#0F1424] rounded-2xl p-8 border border-white/5 shadow-2xl backdrop-blur-md mt-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Immersive Photo Wrapper with Hover Upload Trigger */}
            <div className="relative group w-24 h-24 rounded-full ring-4 ring-indigo-500/20 group-hover:ring-indigo-500/40 transition-all overflow-hidden bg-[#0A0F1C]">
              {user?.profile?.profilePhoto ? (
                <Avatar className="w-full h-full">
                  <AvatarImage src={user?.profile?.profilePhoto} className="object-cover" />
                </Avatar>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-600 text-white font-bold text-2xl">
                  {getInitials(user?.fullname)}
                </div>
              )}
              
              <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300">
                <Camera className="w-5 h-5 text-white animate-pulse" />
                <span className="text-[10px] text-gray-300 font-medium mt-1">
                  {uploading ? "Saving..." : "Change"}
                </span>
                <input type="file" accept="image/*" onChange={handlePhotoChange} disabled={uploading} className="hidden" />
              </label>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 justify-center sm:justify-start">
                {user?.fullname}
                <Badge className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs rounded-md">
                  Candidate
                </Badge>
              </h1>
              <p className="text-sm text-gray-400 mt-1.5 max-w-xl leading-relaxed">
                {user?.profile?.bio || "No professional overview bio configured yet. Click edit to upgrade your snapshot."}
              </p>
            </div>
          </div>

          <Button 
            onClick={() => setOpen(true)} 
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-4 py-2 flex items-center justify-center gap-2 transition-all shrink-0"
          >
            <Pen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Edit Profile</span>
          </Button>
        </div>

        {/* Contact Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-[#0A0F1C]/40 border border-white/5 p-4 rounded-xl">
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-sm truncate">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300 sm:border-l sm:border-white/5 sm:pl-6">
            <Contact className="w-4 h-4 text-pink-400 shrink-0" />
            <span className="text-sm">{user?.phoneNumber || "No phone linked"}</span>
          </div>
        </div>

        {/* Dynamic Skill Pipeline Grid */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Technical Stacks
          </h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length ? (
              user?.profile?.skills.map((item, index) => (
                <Badge 
                  key={index} 
                  className="text-cyan-400 bg-cyan-400/5 border border-cyan-400/10 font-medium rounded-lg text-xs px-3 py-1"
                  variant="none"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500 italic">No skills listed yet</span>
            )}
          </div>
        </div>

        {/* Managed Vetted Documentation Row */}
        <div className="pt-4 border-t border-white/5">
          <Label className="text-sm font-bold uppercase tracking-widest text-gray-400 block mb-3">
            Verified Credentials
          </Label>
          {user?.profile?.resume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white/5 hover:bg-indigo-500/10 border border-white/10 hover:border-indigo-500/30 text-sm text-gray-200 hover:text-white rounded-xl transition-all shadow-md group"
            >
              <FileText className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium">View Candidate Resume PDF</span>
            </a>
          ) : (
            <span className="text-sm text-gray-500 italic">No resume data synchronized. Please upload a profile PDF.</span>
          )}
        </div>
      </div>

      {/* Applied Positions Feed Frame Container */}
      <div className="max-w-5xl mx-auto bg-gradient-to-b from-[#11172a] to-[#0F1424] rounded-2xl p-8 border border-white/5 shadow-2xl backdrop-blur-md mt-8">
        <h2 className="text-xl font-bold text-white tracking-tight mb-6">
          Application Tracking Activity
        </h2>
        <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0A0F1C]/30 p-2">
          <AppliedJobTable />
        </div>
      </div>

      {/* Synchronized Popup Slider Box Overlay Modal Component */}
      <UpdateProfileBox open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;