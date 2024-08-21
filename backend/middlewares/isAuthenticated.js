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

        // Attach user ID to request object
        req.id = decode.userId;

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
