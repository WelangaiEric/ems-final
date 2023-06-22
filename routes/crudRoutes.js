const express = require('express')
const Issues = require('../models/issues')
const Request = require('../models/requests')
const Users = require('../models/users')
const Tasks = require('../models/tasks')
const router = express.Router()
const axios = require('axios')

// issues 
router.post('/issues',(req,res)=>{
    const issue = new Issues(req.body);
    issue.save()
    .then((data)=>{
        res.render('employee',{title:'employee portal',success:'issue sent successfully'})
    })
    .catch((err)=>{
        res.render('employee',{title:'employee portal',danger:'an error occured contact system admin'})
        // console.error(err)
    })
})
router.get('/issues',(req,res)=>{
    Issues.find()
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
})
router.get('/issues/:id',(req,res)=>{
    Issues.find({id:req.params.id})
    .then((data)=>res.send(data))
    .catch((err)=>res.send(err))
})
router.post('/issues/:id',(req,res)=>{
    let query = req.body
    Issues.findOneAndUpdate({id:req.params.id},{$set:query})
    .then((data)=>res.send(data))
    .catch((err)=>res.send(err))
})
router.post('/issues-delete/:id',(req,res)=>{
    Issues.findOneAndDelete({id:req.params.id})
    .then((data)=>{
        res.send(`deleted ${data}`)
    })
    .catch((err)=>res.send(err))
})

// requests 
router.post('/requests',(req,res)=>{
    const request = new Request(req.body)
    request.save()
    .then((data)=>{
        res.render('employee', {title:'employee portal',success:`${data.requestType} for ${data.empName} has been sent`})
    })
    .catch((err)=>{
        res.render('employee',{title:'employee portal',danger:'an error occured contact system admin'})  
    })
})
router.get('/requests',(req,res)=>{
    Request.find()
    .then((data)=>res.send(data))
    .catch((err)=>res.send(err))
})
router.post('/deleterequest',(req,res)=>{
    Request.findOneAndDelete({id:req.body.id})
    .then((data)=>{
        res.redirect('/admin-portal')
       
    })
    .catch()
})
// users 
router.post('/newuser',(req,res)=>{
    const user = new Users(req.body)
    user.save()
    .then((data)=>{
       res.redirect('/admin-portal')
    })
    .catch((err)=>{
        res.render('admin',{title:'admin portal',danger:'an error occured contact system admin'})
    })
})
router.get('/axios',async (req,res)=>{
    await axios.get(
        "http://localhost:3000/users"
    )
    .then((users)=>{
        // console.log(users.data)
        
    })
    .catch((err)=>res.send(err))
})

router.get('/users',(req,res)=>{
    Users.find()
    .then((users)=>res.send(users))
    .catch((err)=>res.send(err))
})
router.post('/deleteuser',(req,res)=>{
    Users.findOneAndDelete({id:req.body.id})
    .then(()=>res.redirect('/admin-portal'))
    .catch((err)=>console.log(err))

   
  
    
    
})
router.post('/updateuser',(req,res)=>{
    let query =  req.body
    Users.findOneAndUpdate({id:req.body.id},{$set:query})
    .then(()=>res.redirect('/admin-portal'))
    .catch((err)=>console.log(err))
})

// task 
router.post('/newtask',(req,res)=>{
    const task = new Tasks(req.body)
    task.save()
    .then((data)=>res.redirect('/admin-portal'))
    .catch((err)=>res.send(err))
})
router.get('/tasks',(req,res)=>{
    Tasks.find()
    .then((data)=>res.send(data))
    .catch((err)=>res.send(err))
})
router.post('/deletetask',(req,res)=>{
    Tasks.findOneAndDelete({id:req.body.id})
    .then(()=>res.redirect('/admin-portal'))
    .catch((err)=>console.log(err))

   
  
    
    
})




module.exports =router