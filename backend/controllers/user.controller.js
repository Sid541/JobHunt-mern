import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const register=async (req, res)=>{
    try {
        const {fullname, email, phoneNumber, password, role}= req.body;
        if(!fullname || !email || !phoneNumber || !password || !role ){
            return res.status(404).json({
                message:"Something is missing",
                succes: false
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User is already exist with this email",
                succes:false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
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
    try {
        if(!email || !password){
            return res.status(400).json({
                message:"Something is missing",
                succes: false
            })
        }
       let user = await User.findOne({email});
        if(!user){
            res.status(404).json({
                message:"Incorrect email or password",
                succes: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            res.status(404).json({
                message:"Incorrect email or password",
                succes: false
            })
        }
        if(role!=user.role){
            res.status(404).json({
                message:"Account does not exist with current role",
                succes: false
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
            succes:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile= async(req,res)=>{
    try {
        const {email, fullname, phoneNumber,password, bio, skills}=req.body;
        const file=req.file
   let skillsArray;
   if(skills){
    skillsArray= skills.split(",");
   }
    const userId = req._id

    let user = await User.findOne(userId);
    if (!user) {
        return res.status(400).json({
            message: "User not found.",
            success: false
        })
    }
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray


        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
     
}