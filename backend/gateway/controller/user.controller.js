export const getCurrentUser=async(req,res)=>{
    return res.status(200).json(req.user);
}