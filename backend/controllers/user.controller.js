import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
export const register=async (req, res)=>{
    try {
        const {fullname, email, phoneNumber, password, role}= req.body;
        
        if(!fullname || !email || !phoneNumber || !password || !role ){
            return res.status(404).json({
                message:"Something is missing",
                success: false
            })
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User is already exist with this email",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res)=>{
    const {email, password, role}=req.body;
    console.log(email, password, role);
    try {
        if(!email || !password){
            return res.status(400).json({
                message:"Something is missing",
                success: false
            })
        }
       let user = await User.findOne({email});
        if(!user){
            res.status(404).json({
                message:"Incorrect email or password",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            res.status(404).json({
                message:"Incorrect email or password",
                success: false
            })
        }
        if(role!=user.role){
            res.status(404).json({
                message:"Account does not exist with current role",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn: '1d'});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie('token', token, {
            httpOnly: true, 
            sameSite: 'strict',
            maxAge: 1*24*60*60*1000 
        }).json({
            message:`Welcome back: ${user.fullname}`,
            user,
            success: true
        })
        }
     catch (error) {
        console.log(error);
    }
}

export const logout = async(req, res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { email, fullname, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        let cloudResponse = null;

        // 1. Check file type before uploading
        if (file) {
            const fileUri = getDataUri(file);
            
            // Is it a PDF document?
            const isPdf = file.mimetype === "application/pdf";

            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: isPdf ? "raw" : "auto" // 👈 "raw" handles PDFs safely, "auto" handles images cleanly
            });
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        
        const userId = req._id || req.id;

        let user = await User.findById(userId); 
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Updating basic text fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // 3. FIX HERE: Dynamically route the Cloudinary URL based on file type
        if (cloudResponse) {
            if (file.mimetype === "application/pdf") {
                // If it's a PDF, save it to the resume fields
                user.profile.resume = cloudResponse.secure_url; 
                user.profile.resumeOriginalName = file.originalname; 
            } else {
                // If it's an image (PNG, JPG, JPEG), save it to the profilePhoto field!
                user.profile.profilePhoto = cloudResponse.secure_url; 
            }
        }

        await user.save();

        // Formatting the response user object so frontend updates smoothly
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};