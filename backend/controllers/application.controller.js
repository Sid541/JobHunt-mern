import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { sendEmailFromRecruiter } from "../utils/emailService.js";

// 1. Submit a brand new job application
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }

        // Check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create a new application mapping document
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error inside applyJob controller:", error);
        return res.status(500).json({
            message: "Internal server error during application process.",
            success: false
        });
    }
};

// 2. Fetch all application paths submitted by a single student user
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } },
                }
            });

        if (!application || application.length === 0) {
            return res.status(404).json({
                message: "No Applications found.",
                success: false
            });
        }

        return res.status(200).json({
            application,
            success: true
        });
    } catch (error) {
        console.error("Error inside getAppliedJobs controller:", error);
        return res.status(500).json({
            message: "Internal server error while fetching applied jobs.",
            success: false
        });
    }
};

// 3. Admin / Recruiter pipeline check to see who applied to a specific job vacancy
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error("Error inside getApplicants controller:", error);
        return res.status(500).json({
            message: "Internal server error while retrieving application tracking list.",
            success: false
        });
    }
};

// 4. Update the application status and fire masked custom emails on behalf of the recruiter
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: 'Status parameters are required.',
                success: false
            });
        }

        // Deeply populate applicant details and the job creator (recruiter profile)
        const application = await Application.findById(applicationId)
            .populate("applicant")
            .populate({
                path: "job",
                populate: { path: "created_by" } 
            });

        if (!application) {
            return res.status(404).json({
                message: "Application log record not found.",
                success: false
            });
        }

        // Save new state option lowercased into MongoDB 
        application.status = status.toLowerCase();
        await application.save();

        // Extract metadata cleanly for email content parsing
        const studentEmail = application.applicant?.email;
        const studentName = application.applicant?.fullname || "Applicant";
        const jobTitle = application.job?.title || "the submitted position";
        const companyName = application.job?.companyName || "the registered firm";

        const recruiterInfo = {
            fullname: application.job?.created_by?.fullname || "Hiring Manager",
            email: application.job?.created_by?.email
        };

        // If email details are resolved, proceed with delivery templates
        if (studentEmail && recruiterInfo.email) {
            let subject = "";
            let htmlContent = "";

            if (status.toLowerCase() === "accepted") {
                subject = `Next Steps: Your application for ${jobTitle} at ${companyName}`;
                htmlContent = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                        <h2 style="color: #22c55e;">Application Shortlisted!</h2>
                        <p>Dear <strong>${studentName}</strong>,</p>
                        <p>We have processed your qualifications for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>
                        <p>Your profile has been marked as <span style="background-color: #dcfce7; color: #15803d; padding: 4px 8px; border-radius: 4px; font-weight: bold;">Shortlisted</span>.</p>
                        <p>I will contact you shortly to arrange a time for an interview conversation. If you have any immediate documents to present, please reply directly to this email message.</p>
                        <br/>
                        <p>Best Regards,</p>
                        <strong>${recruiterInfo.fullname}</strong><br/>
                        <span>Hiring Team @ ${companyName}</span>
                    </div>
                `;
            } else if (status.toLowerCase() === "rejected") {
                subject = `Update regarding your application at ${companyName}`;
                htmlContent = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                        <h2 style="color: #333;">Application Status Update</h2>
                        <p>Dear ${studentName},</p>
                        <p>Thank you for your interest in the <strong>${jobTitle}</strong> opening at <strong>${companyName}</strong>.</p>
                        <p>After reviewing your technical background and experience profile, we regret to inform you that we have decided to proceed with other candidates whose profiles align more closely with the requirements of this specific position at this time.</p>
                        <p>We appreciate your interest in our team and wish you success in your professional search.</p>
                        <br/>
                        <p>Sincerely,</p>
                        <strong>${recruiterInfo.fullname}</strong><br/>
                        <span>Hiring Operations Team</span>
                    </div>
                `;
            }

            // Dispatch out the template completely detached from response execution wait timelines
            if (subject && htmlContent) {
    try {
        await sendEmailFromRecruiter(studentEmail, subject, htmlContent, recruiterInfo);
    } catch (emailError) {
        // 🛡️ Safe Catch: Logs email error but stops the backend server from crashing!
        console.error("⚠️ Nodemailer authenticatio error", emailError.message);
    }
}
        }

        return res.status(200).json({
            message: `Application evaluation updated to ${status} successfully.`,
            success: true
        });

    } catch (error) {
        console.error("Internal status runtime block error:", error);
        return res.status(500).json({
            message: "Internal backend server routing compilation failure.",
            success: false
        });
    }
};