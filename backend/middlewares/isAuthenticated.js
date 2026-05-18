import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        
        // 🔍 DEBUG LOG: Look at your Render terminal logs to see exactly what keys exist inside your payload!
        console.log("--- Token Payload Decode ---", decode);

        // Fallback-safe ID check to cleanly catch 'userId', '_id', or 'id'
        const extractedId = decode.userId || decode.id || decode._id;

        if (!extractedId) {
            console.error("❌ Token verified successfully, but no valid User ID field found in the payload!");
            return res.status(401).json({
                message: "Authentication payload is missing user identifiers",
                success: false,
            });
        }

        // Attach user ID to request object (Matches your updated job.controller perfectly)
        req.id = extractedId;

        // Proceed to next middleware or route handler
        next();
    } catch (error) {
        // Log error and send response
        console.error("Authentication error:", error);
        return res.status(401).json({
            message: "Invalid token",
            success: false,
        });
    }
};

export default isAuthenticated;