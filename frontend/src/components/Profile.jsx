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
  const [open, setOpen]=useState(false);
  const {user}=useSelector(store=>store.auth);

  return (
    <div>
      <Navbar />
      <div className='"max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqQTxgK4s6dLvXDjdU2ptgqQE2ty3g2iapSwm6NxGF9ZXkgXg4qqkzGr8FfTiQD0g9afw&usqp=CAU"
                alt="profile"
              ></AvatarImage>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl ">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button className="text-right rounded-2xl" onClick={()=>setOpen(true)} variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="flex flex-col gap-1 my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="blank"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Mern stack
            </a>
          ) : (
            <span>N/A</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileBox open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
