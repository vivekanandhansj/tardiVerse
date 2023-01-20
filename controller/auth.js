import bcrypt from "bcrypt";
import { createError } from "../utils";
import jwt from "jsonwebtoken"
import User from "../model/User";

export const register = async (req,res,next) => {
    try {
        const salt = bcrypt.getSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        const user = new User({...req.body,password:hash});
        await user.save();
        res.status(200).send("user has been created");
    } catch (error) { 
        new(error)
        
    }



}

export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user) return next(createError (400,"user not found"));
        const isCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isCorrect) return next(createError (400,"wrong credentials"));
        let token = jwt.sign(
            {name: user.name, id: user._id},
            process.env.JWT,
            {expiresIn:'30s'}
        )
        res.json({token}).status(200);
       
    } catch (error) { 
        new(error)
        
    }



}