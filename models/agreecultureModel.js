const mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId


const agreecultureSchema = new mongoose.Schema({
    
    organization: {type: String,required: true},
    property : {type: String , required: true},
    region : {type: String, required: true},
    field : {type: String, required: true},
    crop_cycle_property: {type: String, required: true},
    crop_cycle_field : {type: String, required: true},
    crop : {type: String, required: true},
    userId: {type: ObjectId, ref: "user" },
    deletedAt: {type: Date,default: null},
    isDeleted : {type: Boolean , default : false},
    publishedAt: {type: Date,default: null },
    isPublished: { type: Boolean,default: true }
}, { timestamps: true })

module.exports = mongoose.model("agreeculture", agreecultureSchema)