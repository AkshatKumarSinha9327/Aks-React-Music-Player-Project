const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    userEmail:{
        type:String,
        require:true
    },
    userNumber:{
        type:Number,
        require:true
    },
    userPassword:{
        type:String,
        require:true
    }
})


const User = new mongoose.model("user",userSchema);

module.exports = User;