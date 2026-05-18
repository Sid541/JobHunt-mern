import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.companyId) {
            toast.error("Please select a company first");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:3000/api/v1/job/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F1424] to-[#0B1120] text-gray-200">
            <Navbar />
            <div className="max-w-4xl mx-auto my-10 px-6">
                <form onSubmit={submitHandler} className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/admin/jobs")}
                            className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl"
                        >
                            <ArrowLeft className="h-5 w-5 mr-1" /> Back
                        </Button>
                        <h1 className="font-bold text-2xl text-white">Post New Job Opening</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-gray-300">Job Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
                                placeholder="e.g. Senior React Developer"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-300">Requirements / Skills</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
                                placeholder="Comma separated strings"
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label className="text-gray-300">Job Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
                                placeholder="Describe details regarding role duties..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-300">Salary (LPA)</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
                                placeholder="e.g. 12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-300">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
                                placeholder="e.g. Bangalore, Remote"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-300">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
                                placeholder="Full-Time, Part-Time etc."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-300">Experience Level (Years)</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
                                placeholder="e.g. 3"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-300">No. of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="bg-[#141b2d] border-white/10 text-white focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-300">Select Company</Label>
                            {companies.length > 0 ? (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full bg-[#141b2d] border-white/10 text-white rounded-xl focus:ring-[#632dc0]">
                                        <SelectValue placeholder="Choose a registered company" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#121826] border-white/10 text-white">
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company?.name?.toLowerCase()} className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className="text-xs text-amber-400 font-medium pt-2">No companies found.</p>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <Button disabled className="w-full mt-8 bg-purple-800 text-white rounded-xl py-6 flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" /> Gathering parameters...
                        </Button>
                    ) : (
                        <Button type="submit" disabled={companies.length === 0} className="w-full mt-8 bg-gradient-to-r from-[#632dc0] to-[#4b1fa3] hover:from-[#4b1fa3] hover:to-[#381480] text-white font-semibold py-6 rounded-xl transition-all shadow-lg shadow-purple-950/50">
                            Post New Job
                        </Button>
                    )}
                    {companies.length === 0 && (
                        <p className='text-xs text-red-400 font-bold text-center my-4 border border-red-500/20 bg-red-500/10 p-2 rounded-lg'>
                            * Please register at least one company profile before managing job listings.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;