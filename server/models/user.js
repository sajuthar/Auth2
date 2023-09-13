const Joi  = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    mobile : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    confirmPassword : {
        type:String,
        required:true
    },
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
};

const User = mongoose.model("user",userSchema);

const validate = (data) => {
    console.log(data);
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
        confirmPassword: passwordComplexity().required().label("confirmPassword"),
        mobile: Joi.string().regex(/^(07[1-9]\d{7}|0[1-9][0-9]{8})$/).message("Invalid Sri Lankan mobile number format.").required().label("Mobile Number"),
    
	});
	return schema.validate(data);
};

module.exports = { User, validate };
