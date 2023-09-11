const router = require("express").Router();
const {User,validate} = require("../models/user");
const bcrypt = require("bcrypt");
// const {joi}= require("joi");

router.post("/",async(req,res)=>{
    try {
        console.log(req.body);
        const{error}= validate(req.body);
        if (error)
        // console.log(error);
            return res.status(400).send({message:error.details[0].message});
        const user = await User.findOne({email:req.body.email});
        if(user)
            return res.status(409).send({message:"User with email already exist"});

        const salt = await bcrypt.genSalt(Number(process.env.salt));
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        await new User({...req.body,password:hashPassword}).save();
        res.status(200).send({message:"User created succesfully"});

    } catch (error) {
        res.status(500).send({message:"Internal server error"})
        console.log(error);
    }
})

module.exports = router;