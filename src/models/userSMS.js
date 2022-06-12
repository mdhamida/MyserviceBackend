const mongoose = require("mongoose");
const validator = require("validator");


// define shema
// start.................................
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        minLength:3
    },

    email:{
        type:String,
        required:true,
       validator(value){
        if(!validator.isEmail(value)){
            throw new Error("invalid email id")
        }
       }

    },
    phone:{
        type:Number,
        required:true,
        min:10
    },

    message:{
        type: String,
        required:true,
        minLength:3

    }
})
// end of schema........................................


// 2 create a collection model(Collname, structue/schema)

const User = mongoose.model("Users" , userSchema);



module.exports = User;