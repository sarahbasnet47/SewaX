export const isAdmin =(req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({message:"you are not a admin so access denied"});
    }
    next();
};