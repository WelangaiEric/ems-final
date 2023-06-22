const mongoose = require('mongoose')
const schema = mongoose.Schema;
const requestSchema= new schema({
    empId:{
        type : String,
        required : true
    },
    empName:{
        type : String,
        required : true
    },
    requestType:{
        type : String,
        required : true
    }
})
const Request = mongoose.model('Request',requestSchema)
module.exports=Request;