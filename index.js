// Here we're going to do Authentication and Authorization part-2 
// In this module we will cover all the concept relate to Authentication 
const cookieParser=require('cookie-parser');
const express=require('express');
const mongoose=require('mongoose');
const app=express();
const path =require("path");

const userModel=require('./models/user');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render('index');
});

app.post("/create",async(req,res)=>{
   let {username,email,password,age}=req.body;
   let userdata=await userModel.create({
    username,
    email,
    password,
    age,
})
console.log("user created :",userdata);
res.redirect("/read");
})

app.get("/read",async (req,res)=>{
    let data= await userModel.find();
    res.send(data);
})

app.listen(3000,()=>{
    console.log('The server is working well');
});