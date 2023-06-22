const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const issuesSchema = new Schema(
{
    id:{
        type : String,
        required : true

    },
    empName:{
        type : String,
        required : true
    },
    issueType:{
        type : String,
        required :true
    },
    description:{
        type:String,
        require:true
    }

},{timestamps:true})

const Issues =mongoose.model('Issues',issuesSchema) 
module.exports = Issues;