import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. Token not provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticate;
