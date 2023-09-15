require('dotenv').config();
const express = require("express");
const bp = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltCount = 10;
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
   
   bcrypt.hash(req.body.password, saltCount).then(function(hash) {

        let newUser = new User({
            email:req.body.username,
            password:hash
        });
    
        newUser.save().then(r=>{
            console.log("registered successfully");
            res.render("secrets");
        }).catch(err=>{
            console.log(err);
        });


    });
   
   
});
app.post("/login",(req,res)=>{
    let eml = req.body.username;
    User.findOne({email:eml}).then(user=>{
        if(user){
            if (user.password === req.body.password) {
                res.render("secrets")
            }
            else{
                console.log("incorrect password");
            }
        }
        else{
            console.log("user does not exist");
        }
    }).catch(e=>{console.log(e);})
})


app.listen(3000,()=>{console.log("welcome prabhjot sir");})