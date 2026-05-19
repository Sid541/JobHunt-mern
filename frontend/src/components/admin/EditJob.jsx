import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import useGetJobById from '@/hooks/useGetJobById';
const JOB_API_END_POINT = import.meta.env.VITE_JOB_API_END_POINT


const EditJob = () => {
    const params = useParams();
    const jobId = params.id;
    
    useGetJobById(jobId);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { companies } = useSelector(store => store.company);
    const { singleJob } = useSelector(store => store.job);

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

    useEffect(() => {
        if (singleJob) {
            setInput({
                title: singleJob.title || "",
                description: singleJob.description || "",
                requirements: singleJob.requirements ? singleJob.requirements.toString() : "",
                salary: singleJob.salary || "",
                location: singleJob.location || "",
                jobType: singleJob.jobType || "",
                experience: singleJob.experience || "",
                position: singleJob.position || 0,
                companyId: singleJob.company?._id || singleJob.company || ""
            });
        }
    }, [singleJob]);

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
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while saving configuration.");
        } finally {
            setLoading(false);
        }
    };

    const currentCompany = companies.find(c => c._id === input.companyId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F1424] to-[#0B1120] text-gray-200">
            <Navbar />
            <div className='max-w-xl mx-auto my-10 backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl relative'>
                <div className='flex items-center gap-4 mb-6'>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full border-white/10 text-gray-300 hover:text-white hover:bg-white/10" 
                        onClick={() => navigate("/admin/jobs")}
                    >
                        <ArrowLeft className='h-4 w-4' />
                    </Button>
                    <h1 className='font-bold text-2xl text-white'>Edit Job Post</h1>
                </div>

                <form onSubmit={submitHandler} className="space-y-4">
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label className="text-gray-300">Job Title</Label>
                            <Input className="bg-[#121826]/50 border-white/10 text-white focus:border-purple-500 mt-1" type="text" name="title" value={input.title} onChange={changeEventHandler} required />
                        </div>
                        <div>
                            <Label className="text-gray-300">Description</Label>
                            <Input className="bg-[#121826]/50 border-white/10 text-white focus:border-purple-500 mt-1" type="text" name="description" value={input.description} onChange={changeEventHandler} required />
                        </div>
                        <div>
                            <Label className="text-gray-300">Requirements</Label>
                            <Input className="bg-[#121826]/50 border-white/10 text-white focus:border-purple-500 mt-1" type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} placeholder="React, Node, Mongo" />
                        </div>
                        <div>
                            <Label className="text-gray-300">Salary (LPA)</Label>
                            <Input className="bg-[#121826]/50 border-white/10 text-white focus:border-purple-500 mt-1" type="text" name="salary" value={input.salary} onChange={changeEventHandler} required />
                        </div>
                        <div>
                            <Label className="text-gray-300">Location</Label>
                            <Input className="bg-[#121826]/50 border-white/10 text-white focus:border-purple-500 mt-1" type="text" name="location" value={input.location} onChange={changeEventHandler} required />
                        </div>
                        <div>
                            <Label className="text-gray-300">Job Type</Label>
                            <Input className="bg-[#121826]/50 border-white/10 text-white focus:border-purple-500 mt-1" type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} required />
                        </div>
                        <div>
                            <Label className="text-gray-300">Experience Level</Label>
                            <Input className="bg-[#121826]/50 border-white/10 text-white focus:border-purple-500 mt-1" type="text" name="experience" value={input.experience} onChange={changeEventHandler} required />
                        </div>
                        <div>
                            <Label className="text-gray-300">No. of Positions</Label>
                            <Input className="bg-[#121826]/50 border-white/10 text-white focus:border-purple-500 mt-1" type="number" name="position" value={input.position} onChange={changeEventHandler} required />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <Label className="text-gray-300">Associated Company</Label>
                        {companies.length > 0 && (
                            <Select 
                                onValueChange={selectChangeHandler} 
                                value={currentCompany ? currentCompany.name.toLowerCase() : ""}
                            >
                                <SelectTrigger className="w-full mt-1 bg-[#121826]/50 border-white/10 text-white">
                                    <SelectValue placeholder="Select a Company" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#121826] border-white/10 text-gray-200">
                                    <SelectGroup>
                                        {companies.map((company) => (
                                            <SelectItem className="hover:bg-white/10 focus:bg-white/10 cursor-pointer" key={company._id} value={company.name.toLowerCase()}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {loading ? (
                        <Button className="w-full mt-6 bg-[#632dc0] hover:bg-[#4d2294] text-white" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full mt-6 bg-[#632dc0] hover:bg-[#4d2294] text-white transition-all">
                            Save Changes
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditJob;