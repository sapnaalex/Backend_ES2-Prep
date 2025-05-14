const express=require("express");
const authRouter=express.Router();
const {User,users}=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


authRouter.post("/register",async(req,res)=>{
    try{
        const {username,password}=req.body;
        const existing=users.find((u)=>u.username===username);
        if(existing){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({username,hashedPassword});
        users.push(newUser);

        res.cookie("username",username,{httpOnly: true});
        return res.status(200).json({message:"Register success"});

    }catch(err){
        return res.status(500).json({message:"Internal server error",err});
    }
});


authRouter.post("/login",async(req,res)=>{
    try{
        const{username,password}=req.body;
        const user=users.find((u)=>u.username===username);
        if(!user){
            return res.status(404).json({message:"User not found"});

        }
        const isMatch=await bcrypt.compare(password,user.hashedPassword);
        if(!isMatch){
            return res.status(401).json({message:"Invalid password"});
        }


        const token=jwt.sign({username},process.env.JWT_SECRET,{expiresIn:"2h"});
        res.cookie("token",token,{httpOnly: true});
        return res.status(200).json({message:"Loginsucess"});

    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
});

module.exports=authRouter;