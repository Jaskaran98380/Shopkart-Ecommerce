const User = require("../models/userModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const {sendEmail} = require("../utils/sendEmail")
const crypto = require('crypto')
const cloudinary = require('cloudinary')

//register user

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

    const {name , email , password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    })

    // const token =user.getJwtToken();

    // res.status(201).json({
    //     success:true,
    //     user,
    //     token
    // })

    sendToken(user,201,res);
}
)

//login user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email , password} = req.body;

    if(!email || !password){
        return next (new ErrorHander("Please Enter email and password.",400));
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next (new ErrorHander("Invalid email or password.",401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next (new ErrorHander("Invalid email or password.",401));
    }

    // const token =user.getJwtToken();
    // res.status(200).json({
    //     success:true,
    //     token
    // })

    sendToken(user,200,res);
})

exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token" , null , {
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged Out successfully."
    })
})

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHander("User not found" , 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message=`Your reset password token is \n\n${resetPasswordUrl} \n\n If you have not requested then please ignore.`

    try {

        await sendEmail({
            email:user.email,
            subject:"Ecommerce password recovery.",
            message
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});

        return next(new ErrorHander(error.message,500));
    }
})

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });

    if(!user){
        return next(new ErrorHander("Reset password token is invalid or has been expired.",400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not match.",400))
    }

    user.password = req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();
    sendToken(user,200,res);
})

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne(req.user._id);

    res.status(200).json({
        success:true,
        user
    })
})

exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne(req.user._id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next (new ErrorHander("Old password is incorrect.",401));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next (new ErrorHander("New and confirm password fields does not match.",401));
    }
    user.password=req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
})

exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const userNewDetails = {
        name:req.body.name,
        email:req.body.email
    }
     
    if(req.body.avatar!==""){
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });

          userNewDetails.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url
          }

    }
    
    // console.log(userNewDetails);

    const user = await User.findByIdAndUpdate(req.user._id , userNewDetails , {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

   
    res.status(200).json({
        success:true,
        user
    })
    
})

//get all users(admin)
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

//getSingleUser(admin)

exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

        if(!user){
            return next(new ErrorHander("User does not exist" , 404))
        }
    res.status(200).json({
        success:true,
        user
    })
})

//update user role(admin)
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      };

    
   

    const user = await User.findByIdAndUpdate(req.params.id , newUserData , {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

   
    res.status(200).json({
        success:true,
        user
    })
    
})

//delete user(admin)
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
   
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHander("User does not exist" , 404))
    }

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    await User.deleteOne({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
    
})