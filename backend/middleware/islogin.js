import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const islogin = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token)
    return res.status(401).json({
      message: "unauthorized please login",
    });
  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);

    console.log("LOGGED IN USER:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
};
