const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    title: {type: String,required: true},
    fname : {type: String , required: true},
    lname : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)