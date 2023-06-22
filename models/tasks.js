const mongoose = require('mongoose')
const Schema = mongoose.Schema
const taskSchema = new Schema({
    // id:{
    //     type : String,
    //     required:true
    // },
    initials:{
        type : String,
        required : true
    },
    taskName:{
        type : String,
        required : true
    },
    employee:{
        type : String,
        required : true
    }
    ,
    description:{
        type : String,
        required : true
    }
    
})

const Tasks = mongoose.model('Tasks',taskSchema)
module.exports = Tasks