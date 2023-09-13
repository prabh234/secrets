require('dotenv').config();
const express = require("express");
const bp = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const app = express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bp.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema =new mongoose.Schema({
    email:String,
    password:String
});

let secret = process.env.SECRET;

userSchema.plugin(encrypt, { secret: secret,encryptedFields: ['password']  });


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
    let newUser = new User({
        email:req.body.username,
        password:req.body.password
    });
    newUser.save().then(r=>{
        console.log("registered successfully");
        res.render("secrets");
    }).catch(err=>{
        console.log(err);
    });
})
app.post("/login",(req,res)=>{
    let eml = req.body.username;
    User.findOne({email:eml}).then(user=>{
        console.log(user.password);
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