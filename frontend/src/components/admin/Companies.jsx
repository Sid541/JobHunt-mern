import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';

const Companies = () => {
    // ⚡ Local state replaces Redux global slice values
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F1424] to-[#0B1120] text-gray-200">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            </div>

            <div className="relative z-10">
                <Navbar />
                <div className="max-w-6xl mx-auto my-10 px-4">
                    <div className="flex items-center justify-between my-8 backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
                        <Input
                            className="w-fit px-4 py-2 bg-[#141b2d] border-white/10 text-white placeholder-gray-400 focus:border-[#632dc0] focus:ring-1 focus:ring-[#632dc0] rounded-xl"
                            placeholder="Filter by Company name..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button 
                            className="bg-gradient-to-r from-[#632dc0] to-[#4b1fa3] hover:from-[#4b1fa3] hover:to-[#381480] text-white font-medium px-6 py-2 rounded-xl transition-all shadow-lg shadow-purple-900/30" 
                            onClick={() => navigate("/admin/companies/create")}
                        >
                            + Add New Company
                        </Button>
                    </div>
                    {/* ⚡ Pass the local tracking input text directly to the table component */}
                    <CompaniesTable searchCompanyByText={input} />
                </div>
            </div>
        </div>
    );
};

export default Companies;