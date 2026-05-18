import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "Job title is required."]
    },
    description:{
        type: String,
        required: [true, "Job description is required."]
    },
    salary:{
        type: Number,
        required: [true, "Salary is required."]
    },
    position:{
        type: String,
    },
    requirements:[{
        type: String,
    }],
    location:{
        type: String,
        required: [true, "Location is required."]
    },
    jobType:{
        type: String,
    },
    experience:{
        type: Number,
    },
    company:{
        type: mongoose.Schema.Types.ObjectId, // 💡 Pro-Tip: Changed .ObjectId to .Types.ObjectId for uniformity
        ref: 'Company',
    },
    // 🛡️ PERMANENT FIX: Adding strict 'required' validation here.
    // MongoDB will now actively block data insertion if a recruiter ID is missing.
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "A job cannot be created without a valid recruiter (User) reference."]
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
},{timestamps:true});

export const Job = mongoose.model("Job", jobSchema);