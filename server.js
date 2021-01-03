//variables
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Scrip = require('./scripModel');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const port = process.env.port || 8000;
const host = process.env.host || "192.168.43.155";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use("/public",express.static('public'));    
app.set('view engine', 'ejs');

//connecting db
mongoose.connect(process.env.mongodb_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}, err => {
    if(err) throw err;
    console.log("Connected to db");
});

//routes
app.get('/',async (req,res)=>{
    const allData = await Scrip.find();
    res.render('index',{data:allData});
});
app.post('/register',async (req,res)=>{
    const {date,index,lot,ratio,stPrice,buy,sell,price} = req.body;
    if(!stPrice || !buy || !sell)
        return res.json({status:"error1",error1:"Please fill all the feilds"})
    if(typeof stPrice!=="number" || typeof buy!=="number" || typeof sell !== "number")
        return res.json({status:"error2",error2:"Invalid feilds"})
    try{
        const response = await Scrip.create({
            date,
            index,
            lot,
            ratio,
            stPrice,
            buy,
            sell,
            price
        })
        const allData = await Scrip.find();
        res.json({status:"ok"})
    }catch(err){
        console.log(err.message);
    }
})
app.delete('/delete',async (req,res)=>{
    const {id} = req.body;
    try{
       Scrip.findByIdAndDelete(id,(err,docs)=>{
           if(err) throw err;
       })
       res.json({status:"ok"})
    }catch(err){
        console.log(err.message);
    }
})

//server 
app.listen(port,host,()=>{
    console.log(`server started at  http://${host}:${port}`);
});