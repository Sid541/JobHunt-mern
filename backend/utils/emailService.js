import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Dispatches a dynamic notification email to a student, masking headers to show recruiter data
 * @param {string} to - The student's email address
 * @param {string} subject - Email subject line
 * @param {string} htmlContent - HTML email body layout
 * @param {object} recruiter - Object containing { fullname, email }
 */
export const sendEmailFromRecruiter = async (to, subject, htmlContent, recruiter) => {
    try {
        // 🔍 ABSOLUTE FAILSAFE TELEMETRY LOGS
        console.log("--- 🕵️‍♂️ RUNTIME SMTP CONFIG CHECK ---");
        console.log("Configured Core Sending User:", process.env.EMAIL_USER);
        console.log("Configured Token Key Length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);
        console.log("-----------------------------------------");

        // ✅ THE FIX: Initialize transporter dynamically inside the function execution frame
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Pulls the clean 16-character key dynamically
            },
        });

        // Fallback safety constraints if recruiter metadata fails to propagate
        const recruiterName = recruiter?.fullname || "Hiring Team";
        const recruiterEmail = recruiter?.email || process.env.EMAIL_USER;

        const mailOptions = {
            // Mask the visual display header: "Recruiter Name" <system_email@gmail.com>
            from: `"${recruiterName}" <${process.env.EMAIL_USER}>`,
            to: to,
            // Overrides reply path routing straight to the recruiter's inbox
            replyTo: recruiterEmail, 
            subject: subject,
            html: htmlContent,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`🚀 SUCCESS: Email successfully routed to ${to}. MessageId: ${info.messageId}`);
    } catch (error) {
        console.error("Critical: SMTP execution framework failed:", error);
        // Throwing error up so your main controller try/catch block captures it cleanly
        throw error; 
    }
};