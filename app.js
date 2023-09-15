require('dotenv').config();
const express = require("express");
const bp = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const plm = require('passport-local-mongoose');
const app = express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bp.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema =new mongoose.Schema({
    email:String,
    password:String
});


const User = new mongoose.model('User',userSchema)

app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",(req,res)=>{
   
});
app.post("/login",(req,res)=>{
   
})


app.listen(3000,()=>{console.log("welcome prabhjot sir");})