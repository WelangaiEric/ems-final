const express = require('express')
const router = express.Router()
require('dotenv').config()
const axios = require('axios')


// token generation middleware
const generateToken = async ( req,res,next)=>{
    const secret = process.env.mpesa_consumer_secret;
    const consumer = process.env.mpesa_consumer_key;
    const auth =new Buffer.from(`${consumer}:${secret}`).toString("base64")
    await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
        headers:{
            authorization : `Basic ${auth}`
        }

    }
    ).then((response)=>{
        token = response.data.access_token;
        console.log(token)
        next();
    }).catch((err)=>{
        console.log(err)
        // res.status(400).json(err.message)
        
    })
}


router.post('/send',generateToken, async (req,res)=>{
    const phone = req.body.phone
    const amount = req.body.Amount; 
    const date = new Date();
    const timestamp =   
        date.getFullYear()+
        ("0"+(date.getMonth()+1)).slice(-2)+
        ("0"+date.getDate()).slice(-2)+
        ("0"+date.getHours()).slice(-2)+
        ("0"+date.getMinutes()).slice(-2)+
        ("0"+date.getSeconds()).slice(-2);
        
    const shortcode = process.env.mpesa_paybill;
    const passkey = process.env.mpesa_passkey;
    const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")
    console.log(phone+','+amount) 
    await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {    

        "BusinessShortCode": shortcode,    
        "Password": password,    
        "Timestamp":timestamp,    
        "TransactionType": "CustomerBuyGoodsOnline",    
        "Amount": amount,    
        "PartyA":phone,    
        "PartyB":shortcode,    
        "PhoneNumber":phone,    
        "CallBackURL": "https://mydomain.com/pat",    
        "AccountReference":phone,    
        "TransactionDesc":"Test"
     },
     {
        headers:{
            
            'Authorization':`Bearer ${token}`
        }
     }

    ).then((result)=>{
       
      
        res.redirect('/admin-portal')

    }).catch((err)=>{
        res.redirect('/admin-portal')
        
        
    })


})

// SALARY PAYMENT 

router.post('/salary',generateToken ,async (req,res)=>{
    await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
        {
            
                "InitiatorName": "testapi",
                "SecurityCredential": "UWg7Ywxi0zjFU9Rgsbbiob4pFgxVM8lt9+WN2XRv60TsNEPEjbK+K+USZCD20HaOw2ONgfo5vruwxG84HdoNhBIdbu5PIoRwlvolu9FY85Vt92nt5bIZacSuPltDzRKofzzMU6c8f/t+vnM2soUFPuntFsl98GFGLMW2yuO3ZWn5/FIDrOnF57u2gMhPr5NafMAbgLse+CPq63D6qTYyS2liyZhKP64pcxrVb0Dh0a36mSFej4UwiOWLx4x2Fw2hwxL6w8HFsLfpQzyA66Lh5IkfdT6DKZyZyFKnAK/ve+W2Gc+l12MEpNmwd+mOuV/1fGtDSU1rRgFA7jjOWRFVGg==",
                "CommandID": "BusinessPayment",
                "Amount": "1",
                "PartyA": "600977",
                "PartyB": "254708374149",
                "Remarks": "Test remarks",
                "QueueTimeOutURL": "https://mydomain.com/b2c/queue",
                "ResultURL": "https://mydomain.com/b2c/result",
                "Occassion": "",
              
        },{
        headers:
        {
            'Content-Type': 'application/json',
	        'Authorization': `Bearer ${token}`
        }}
    )
    .then((result)=>{
       
       
        res.redirect('/admin-portal')

    }).catch((err)=>{
        
        res.redirect('/admin-portal')
        
        
    })
})


module.exports= router;
