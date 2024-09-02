import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileBox from "./UpdateProfileBox";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Reactjs",
  "Nodejs",
  "Express",
  "Auth0",
  "MySQL",
];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">{user?.fullname}</h1>
              <p className="text-gray-600 mt-2">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            className="rounded-full p-2 border-gray-300 text-gray-600 hover:text-gray-800 transition"
            onClick={() => setOpen(true)}
            variant="outline"
          >
            <Pen size={20} />
          </Button>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-4 text-gray-700">
            <Mail size={18} />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <Contact size={18} />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="text-blue-700 bg-blue-100">{item}</Badge>
              ))
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-md font-bold text-gray-800">Resume</Label>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-3"
            >
              View Resume
            </a>
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 shadow-lg mb-8">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileBox open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
