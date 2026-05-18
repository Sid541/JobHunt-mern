import { Job } from "../models/job.model.js";

// 1. Recruiter creates a brand new vacancy and links their account ID
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        
        // Match directly with what your updated isAuthenticated middleware passes down
        const userId = req.id; 

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized. Please log in again.",
                success: false
            });
        }

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary) || 0,
            location,
            jobType,
            experience: Number(experience),
            position,
            company: companyId,
            created_by: userId // Links to the authorized recruiter's _id cleanly
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error inside postJob:", error);
        return res.status(500).json({
            message: "Failed to create new job posting.",
            success: false
        });
    }
};

// 2. Fetch all jobs for student users matching a search keyword
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        
        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error inside getAllJobs:", error);
        return res.status(500).json({
            message: "Internal server error while fetching job feeds.",
            success: false
        });
    }
};

// 3. Fetch a single job specification with its raw application IDs
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });

        if (!job) {
            return res.status(404).json({
                message: "Job vacancy not found.",
                success: false
            });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error("Error inside getJobById:", error);
        return res.status(500).json({
            message: "Internal server error while retrieving vacancy information.",
            success: false
        });
    }
};

// 4. Fetch all job positions posted by a single specific Recruiter admin account
export const getAdminJobs = async (req, res) => {
    try {
        // Updated to use the clean req.id variable from your verified token payload
        const adminId = req.id; 
        console.log("➡️ [AUTH CHECK] Logged-in Admin User ID (req.id):", adminId);

        if (!adminId) {
            console.log("❌ [AUTH ERROR] req.id is missing or undefined! Check your isAuthenticated middleware.");
            return res.status(401).json({
                message: "Unauthorized. Admin ID is missing.",
                success: false
            });
        }

        console.log("🔍 [DB QUERY] Fetching jobs matching created_by:", adminId, "or legacy entries...");
        
        const jobs = await Job.find({ 
            $or: [
                { created_by: adminId },
                { created_by: { $exists: false } },
                { created_by: null }
            ]
        })
        .populate({
            path: 'company'
        })
        .sort({ createdAt: -1 });

        console.log("📦 [DB RESULT] Raw jobs array returned from MongoDB. Total count:", jobs ? jobs.length : 0);
        
        if (jobs && jobs.length > 0) {
            console.log("📋 [DATA PREVIEW] First job item details:");
            console.log("   - Title:", jobs[0].title);
            console.log("   - Created By (Owner ID):", jobs[0].created_by);
            console.log("   - Associated Company Name:", jobs[0].company?.name || "No company linked");
        } else {
            console.log("⚠️ [DB WARNING] The jobs array is completely empty.");
        }

        if (!jobs || jobs.length === 0) {
            console.log("✅ [RESPONSE] Sending empty array fallback to frontend with status 200.");
            console.log("==================== GET ADMIN JOBS END ====================");
            return res.status(200).json({
                jobs: [],
                success: true,
                message: "No jobs created by this admin yet."
            });
        }

        console.log("✅ [RESPONSE] Sending complete jobs array to frontend successfully.");
        console.log("==================== GET ADMIN JOBS END ====================");
        
        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.log("💥 [CRITICAL CRASH] Error detected inside getAdminJobs controller:");
        console.error(error);
        console.log("==================== GET ADMIN JOBS END ====================");
        
        return res.status(500).json({
            message: "Internal server error while pulling recruiter dashboard telemetry.",
            success: false
        });
    }
};

// 5. Update an existing job profile details
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;

        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            {
                title,
                description,
                requirements: Array.isArray(requirements) ? requirements : requirements?.split(","),
                salary: Number(salary),
                location,
                jobType,
                experience: Number(experience),
                position,
                company: companyId 
            },
            { new: true, runValidators: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ 
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job: updatedJob,
            success: true
        });

    } catch (error) {
        console.error("Error inside updateJob:", error);
        return res.status(500).json({
            message: "Internal server error while modifying job dataset records.",
            success: false
        });
    }
};