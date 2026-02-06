const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const blacklistTokenModel=require('../models/blacklistToken.model');
const captainModel=require('../models/captain.model');

module.exports.authUser=async(req,res,next)=>{
        const token=req.cookies.token||req.headers.authorization?.split(' ')[1];
        if(!token){
                return res.status(401).json({message:'Unauthorized'});
        }
        const isBlacklisted=await blacklistTokenModel.findOne({token:token});
        if(isBlacklisted){
                return res.status(401).json({message:'Token is unauthorized'});
        }
        try{
                const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
                const user=await userModel.findById(decoded._id)
                req.user=user;
                return next();
        }catch(err){
                return res.status(400).json({message:'Unauthorized '});

        }


}


module.exports.authCaptain=async(req,res,next)=>{
        const token=req.cookies.token||req.headers.authorization?.split(' ')[1];
        console.log("Auth Captain Middleware Token:", token);
        if(!token){
                return res.status(401).json({message:'Unauthorized'});
        }
        const isBlacklisted=await blacklistTokenModel.findOne({token:token});
        if(isBlacklisted){
                return res.status(401).json({message:'Token is unauthorized'});
        }
        console.log(isBlacklisted);
        try{
                const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
                const captain=await captainModel.findById(decoded._id)
                req.captain=captain;
                return next();
        }
        catch(err){
                return res.status(400).json({message:'Unauthorized '});
        }
}