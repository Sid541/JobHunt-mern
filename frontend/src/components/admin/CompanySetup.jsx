import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
const COMPANY_API_END_POINT = import.meta.env.VITE_COMPANY_API_END_POINT

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { singleCompany } = useSelector(store => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F1424] to-[#0B1120] text-gray-200">
      <Navbar />
      <div className="max-w-3xl mx-auto my-10 px-6">
        <form onSubmit={submitHandler} className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate("/admin/companies")}
              className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 mr-1" /> Back
            </Button>
            <h1 className="font-bold text-2xl text-white">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-300 font-medium">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 font-medium">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label className="text-gray-300 font-medium">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 font-medium">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 font-medium">Logo Thumbnail</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="bg-[#141b2d] border-white/10 text-white file:text-purple-400 file:font-semibold hover:file:bg-white/5 cursor-pointer rounded-xl"
              />
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full mt-8 bg-purple-800 text-white rounded-xl py-6 flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-8 bg-gradient-to-r from-[#632dc0] to-[#4b1fa3] hover:from-[#4b1fa3] hover:to-[#381480] text-white font-semibold py-6 rounded-xl transition-all shadow-lg shadow-purple-950/50">
              Update Details
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;