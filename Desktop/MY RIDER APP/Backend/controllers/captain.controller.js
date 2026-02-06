const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    try {
        // 1. Validation check
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        // 2. Check if captain already exists (FIXED)
        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(409).json({
                message: 'Captain already exists'
            });
        }

        // 3. Hash password
        const hashedPassword = await captainModel.hashPassword(password);

        // 4. Create captain
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        // 5. Generate token
        const token = await captain.generateAuthToken();

        // 6. Remove sensitive data before sending
        captain.password = undefined;

        return res.status(201).json({
            message: 'Captain registered successfully',
            token,
            captain
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports.loginCaptain = async (req, res, next) => {
        const error=validationResult(req);
        if(!error.isEmpty()){
                return res.status(400).json({errors:error.array()});
        }
        const {email,password}=req.body;
        const captain=await captainModel.findOne({email}).select('+password');
        if(!captain){
                return res.status(401).json({message:'Invalid email or password'});
        }
        const isMatch=await captain.comparePassword(password);
        if(!isMatch){
                return res.status(401).json({message:'Invalid email or password'});
        }
        const token=await captain.generateAuthToken();
        res.cookie('token',token);
        res.status(200).json({message:'Captain logged in successfully',token,captain});
}

module.exports.getCaptainProfile=async(req,res,next)=>{
        // Assuming captain is authenticated and captain ID is available in req.captainId
        res.status(200).json({captain:req.captain});
}

module.exports.logoutCaptain=async(req,res,next)=>{
        const token=req.cookies.token||req.headers.authorization.split(' ')[1];
        await blacklistTokenModel.create({token});
        res.clearCookie('token');
        
        res.status(200).json({message:'Captain logged out successfully'});
}

