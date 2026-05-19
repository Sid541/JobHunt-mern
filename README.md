💼 JobHunt — MERN Job Portal
JobHunt is a modern job portal application that bridges the gap between job seekers and recruiters through a streamlined, high-performance platform.

The application architecture features two primary workflows—one tailored for recruiters to scout talent, and another dedicated to students looking to kickstart their careers. Recruiters can post job openings for their registered companies, while students can browse, apply for jobs, and receive real-time updates on their application status.

🚀 Features
🔐 User Authentication: Secure login and signup functionality equipped with server-side identity role provisioning (Recruiter vs. Student).

🎯 Recruiter Dashboard:

🏢 Post and manage comprehensive job listings for registered business entities.

👥 Monitor incoming applicant pipelines with granular tracking.

🔄 Process real-time applicant indexing (Set status to Accepted or Rejected).

🎓 Student Dashboard:

🔍 Filter, browse, and apply for open positions seamlessly.

📊 Track active submissions and historical career selections.

⚡ Real-Time System Feedback: Dynamic UI updates mapping user tracking pipelines instantly without jarring full-page reloads.

📧 Automated Email Notifications: Instantly triggers an automated transactional email notification to the applicant's registered email address the exact moment a recruiter updates their application review status (e.g., Selected or Rejected).

☁️ Cloud Infrastructure Asset Hosting: Deep integration with the Cloudinary storage engine to handle user profile avatars and organizational branding media assets.

🛠️ Tech Stack
🎨 Frontend: React.js, Tailwind CSS, Shadcn UI

⚙️ Backend: Node.js, Express.js

🗄️ Database: MongoDB Atlas (Cloud Database Management Engine)

🔑 Authentication: JWT (JSON Web Token Architecture) utilizing encrypted, secure httpOnly cookies.

🧠 State Management: Redux Toolkit (Persistent root state configuration)

📨 Email Broker Integration: Nodemailer / SendGrid API

🖼️ Image Hosting: Cloudinary CDN

💻 Installation & Setup
📋 Prerequisites
Node.js (>=14.0.0)

npm (>=6.14.0) or yarn (>=1.22.0)

A live MongoDB Atlas Connection String Matrix
