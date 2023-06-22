const mongoose = require('mongoose')
const schema = mongoose.Schema;
const usersSchema = new schema({
    firstName:{
        type : String,
        required : true
    },
    lastName:{
        type : String,
        required : true
    },
    email:{
        type : String,
        unique: true,
        required : true
    },
    phone:{
        type : Number,
        required : true,
        unique: true
    },
    employeeType:{
        type : String,
        required : true
    },
    employeeStatus:{
        type : String,
        required : true
    },
    salary:{
        type : Number,
        required : true
    },
    date:{
        type : Date,
        required:true
    },
    employeeRole:{
        type : String,
        required : true
    }



})
const Users = mongoose.model('Users',usersSchema)
module.exports = Users