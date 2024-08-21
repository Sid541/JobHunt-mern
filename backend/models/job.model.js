import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    position:{
        type:String,
        
    },
    requirements:[{
        type:String,
        
    }],
    location:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        
    },
    experience:{
        type: Number,
        
    },
    company:{
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
       

    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
},{timestamps:true});
export const Job = mongoose.model("Job", jobSchema);