const express = require('express')
const router = express.Router()
const axios = require('axios')
const users = require('../models/users')
const {check,validationResult}= require('express-validator')
const bodyParser = require('body-parser')
const emailValidator = require('deep-email-validator');
const Tasks = require('../models/tasks')
const Users = require('../models/users')



const urlencodedParser = bodyParser.urlencoded({extended:false})


router.get('/',(req,res)=>{
    res.render('index',{title:'home'})
})

router.get('/portal',(req,res)=>{
    res.render('login',{title:'login'})
})
router.get('/admin-portal', async (req,res)=>{
    let taskData 
    let requestData
    await axios.get(
        "https://ems-v1og.onrender.com/tasks"

    )
    .then((tasks)=>{
        taskData = tasks.data

        
        
    })
    .catch((err)=>{
        res.send(err)
    })
    await axios.get(
        "https://ems-v1og.onrender.com/requests"

    )
    .then((request)=>{
        requestData = request.data

        
        
    })
    .catch((err)=>{
        res.send(err)
    })
    // console.log(taskData)

    await axios.get(
        "https://ems-v1og.onrender.com/users"
    )
    .then((users)=>{
        let usersData = users.data
        res.render('admin',{title:'admin portal',data:usersData,tasks:taskData,requests:requestData})

        
    })
    .catch((err)=>{
        res.render('admin',{title:'admin portal',danger:'an error occured'})
    })
    
})
router.post('/validate-email',async (req,res,next)=>{
    const email = req.body.email;
    
        
      
        if (!email){
          return res.status(400).send({
            message: "Email or password missing."
          })
        }
      
        const {valid, reason, validators} = await isEmailValid(email);
      
        if (valid) return res.send({message: "OK"});
      
        return res.status(400).send({
          message: "Please provide a valid email address.",
          reason: validators[reason].reason
        })
        
})
router.get('/employee-portal', async (req,res)=>{
    let taskData
    await axios.get(
        "https://ems-v1og.onrender.com/tasks"

    )
    .then((tasks)=>{
        taskData = tasks.data  
    })
  
    res.render('employee',{title:'employee portal',tasks:taskData})
})
router.post('/mytasks',(req,res)=>{
    console.log(req.body.user)
    Tasks.findOne()

  

    .then(
        (mytasks)=>{
            console.log(mytasks)
            res.render('employee',{title:'employee portal',tasks:mytasks})
    })
    .catch((err)=>res.send(err))

})

router.post('/login',async (req,res)=>{
   
            let check
            await Users.findOne({email:req.body.email})
            .then((result)=>{
                check = result
            console.log(check)

               
                    if(check.employeeRole==='admin'&& check.email===req.body.email&&check.phone===req.body.password){
                    //   res.render('admin',{title:'Admin-portal',user:check})
                      res.redirect('/admin-portal')
                    //   console.log(check)
                
    
                    }
                         if(check.employeeRole==='user'&& check.email===req.body.email&&check.phone===req.body.password){
                    //   res.render('admin',{title:'Admin-portal',user:check})
                      const finder= `${check.firstName}${check.lastName}`
                        console.log(finder)
                        Tasks.find({employee:finder})
                    
                
                        .then(
                            (mytasks)=>{
                                console.log(mytasks)
                                res.render('employee',{title:'employee portal',tasks:mytasks,user:check})
                        })
                        .catch((err)=>res.render('login',{title:'login',danger:'something went wrong'}))
                    //   console.log(check)
                
    
                    }
                else{
                    res.render('login',{title:'login',danger:'incorrect username or password'})
                }
                  
                
            })
            .catch((err)=>{
                res.render('login',{title:'login',danger:'incorrect username or password'})
            })

         
        }
       

)


module.exports=router;
