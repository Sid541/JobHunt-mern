import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
const COMPANY_API_END_POINT = import.meta.env.VITE_COMPANY_API_END_POINT

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name cannot be empty");
            return;
        }
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F1424] to-[#0B1120] text-gray-200">
            <Navbar />
            <div className="max-w-4xl mx-auto my-20 px-6">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">
                    <div className="mb-6">
                        <h1 className="font-bold text-3xl text-white bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Your Company Name</h1>
                        <p className="text-gray-400 mt-2">What would you like to name your company? You can easily modify this details later.</p>
                    </div>

                    <div className="space-y-2 mt-6">
                        <Label className="text-gray-300 font-semibold tracking-wide">Company Name</Label>
                        <Input
                            type="text"
                            className="my-2 bg-[#141b2d] border-white/10 text-white placeholder-gray-500 focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl py-6"
                            placeholder="JobHunt, Microsoft etc."
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                        <Button 
                            variant="outline" 
                            className="border-white/10 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl px-6"
                            onClick={() => navigate("/admin/companies")}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className="bg-gradient-to-r from-[#632dc0] to-[#4b1fa3] hover:from-[#4b1fa3] hover:to-[#381480] text-white px-6 rounded-xl shadow-lg shadow-purple-950/50" 
                            onClick={registerNewCompany}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;