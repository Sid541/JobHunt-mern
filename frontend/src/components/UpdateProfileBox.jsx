import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, User, Mail, Phone, FileSignature, Layers, UploadCloud } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { USER_API_END_POINT } from "../utils/constant";


const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to sync updates.");
        } finally {
            setLoading(false);
        }
    };

    // Clean reusable sub-element input configuration class
    const fieldStyle = "w-full bg-[#0A0F1C] border-white/10 text-white rounded-xl h-11 px-4 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-gray-600";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent 
                className="max-w-lg bg-[#11172a] border border-white/10 text-gray-200 rounded-2xl shadow-2xl backdrop-blur-xl"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white tracking-tight">Sync Cloud Matrix</DialogTitle>
                    <DialogDescription className="text-xs text-gray-400">
                        Modify profile metadata elements below. Hit save to distribute logs network-wide.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={submitHandler} className="space-y-5 mt-2">
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                        
                        {/* Name Field */}
                        <div className="space-y-1.5">
                            <Label htmlFor="fullname" className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                                <User className="w-3.5 h-3.5 text-indigo-400" /> Full Identity Name
                            </Label>
                            <Input id="fullname" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} className={fieldStyle} placeholder="John Doe" required />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-cyan-400" /> Professional Email
                            </Label>
                            <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} className={fieldStyle} placeholder="name@domain.com" required />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1.5">
                            <Label htmlFor="phoneNumber" className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5 text-pink-400" /> Contact Metric
                            </Label>
                            <Input id="phoneNumber" name="phoneNumber" type="text" value={input.phoneNumber} onChange={changeEventHandler} className={fieldStyle} placeholder="+91 XXXXX XXXXX" />
                        </div>

                        {/* Bio Row */}
                        <div className="space-y-1.5">
                            <Label htmlFor="bio" className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                                <FileSignature className="w-3.5 h-3.5 text-purple-400" /> Executive Bio Summary
                            </Label>
                            <Input id="bio" name="bio" type="text" value={input.bio} onChange={changeEventHandler} className={fieldStyle} placeholder="Brief executive narrative statement..." />
                        </div>

                        {/* Skills Box Input */}
                        <div className="space-y-1.5">
                            <Label htmlFor="skills" className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                                <Layers className="w-3.5 h-3.5 text-emerald-400" /> Skills (Comma Separated)
                            </Label>
                            <Input id="skills" name="skills" type="text" value={input.skills} onChange={changeEventHandler} className={fieldStyle} placeholder="React, Node.js, Python, AWS" />
                        </div>

                        {/* Interactive Premium File Upload Block */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">
                                Synchronize Resume Document
                            </Label>
                            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/10 hover:border-indigo-500/40 bg-[#0A0F1C] rounded-xl cursor-pointer transition-all group">
                                <div className="flex flex-col items-center justify-center pt-4 pb-3 text-center px-4">
                                    <UploadCloud className="w-6 h-6 text-gray-500 group-hover:text-indigo-400 group-hover:scale-110 transition-all mb-1" />
                                    <p className="text-xs text-gray-400 font-medium">
                                        {input.file?.name ? (
                                            <span className="text-indigo-400 font-semibold truncate max-w-[250px] block">{input.file.name}</span>
                                        ) : (
                                            "Click to drop or browse files"
                                        )}
                                    </p>
                                    <p className="text-[10px] text-gray-600 mt-0.5">Accepts encrypted PDF pipelines up to 10MB</p>
                                </div>
                                <input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} className="hidden" />
                            </label>
                        </div>

                    </div>

                    <DialogFooter className="pt-2 border-t border-white/5">
                        {loading ? (
                            <Button disabled className="w-full bg-indigo-600 text-white rounded-xl h-11 font-semibold flex items-center justify-center gap-2">
                                <Loader2 className='w-4 h-4 animate-spin' /> 
                                <span>Distributing Log Entries...</span>
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl h-11 shadow-lg shadow-indigo-600/10 transition-all">
                                Save Structural Changes
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;