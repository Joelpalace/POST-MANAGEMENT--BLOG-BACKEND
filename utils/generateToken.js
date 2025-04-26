import jwt from "jsonwebtoken";

const generateToken = (user) => {
    // Create a token with user ID and role, expires in 30 days
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET, { expiresIn: "7d" }
    );
}
 export default generateToken;
// This function generates a JWT token for the user, which can be used for authentication in subsequent requests.