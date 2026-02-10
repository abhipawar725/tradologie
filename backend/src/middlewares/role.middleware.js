const authorizeAdmin = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized please login" });
    }

    if(req.user.role !== "admin"){
      return res.status(403).json({ message: "Unauthorized admin only" });  
    }
    
    next()
};

export default authorizeAdmin;
