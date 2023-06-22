const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const axios = require('axios')
const morgan = require('morgan')
const port = process.env.PORT;
const app = express();
const pageRoutes = require('./routes/pageRoutes')
const mpesaRoutes = require('./routes/mpesaRoutes')
const crudRoutes = require('./routes/crudRoutes')

// database connect
const dbURI = process.env.db_conection_string
mongoose.set('strictQuery',true)
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
    console.log('database connected')
   })
.catch((err)=>console.log('cannot connect database'))

app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})
 
// set view engine
app.set('view engine','ejs')

// configurations
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(express.json())
app.use(pageRoutes);
app.use(mpesaRoutes);
app.use(crudRoutes);





