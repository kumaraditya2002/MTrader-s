//variables
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Scrip = require('./scripModel');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 8000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use("/public",express.static('public'));    
app.set('view engine', 'ejs');

//connecting db
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}, err => {
    if(err) throw err;
    console.log("Connected to db");
});

//routes
app.get('/',async (req,res)=>{
    res.render('index');
});

app.get('/plans',async (req,res)=>{
    res.render('plans');
});
app.get('/webinar',async (req,res)=>{
    res.render('webinar');
});
app.get('/disclaimer',async (req,res)=>{
    res.render('disclaimer');
});
app.get('/about',async (req,res)=>{
    res.render('about');
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
});

app.get('/data',async (req,res)=>{
    res.statusCode=200;
    const allData = await Scrip.find();
    res.render('data',{data:allData});
});

//server 
app.listen(port,()=>{
    console.log(`server started at ${port}`);
});