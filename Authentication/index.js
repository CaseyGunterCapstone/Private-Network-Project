const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const dal = require("./dal/users-mongo-dal").DAL;


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());


app.get("/",(req,res)=>{
    dal.pingDB();
    res.render("home");
});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        let body = {
            username: req.body.username,
            password: hash,
            email: req.body.email,
            profileImage: req.body.profileImage
        };
        dal.addDoc(body);
    });

});

    res.render("register");
});


app.get("/update",(req,res)=>{
    res.render("update");
});
app.post("/update",(req,res)=>{
    let changes = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        profileImage: req.body.profileImage
    };
    dal.changeSomeone(req.body.username,changes);
    res.render("update");
});

app.listen(port,()=>{
    console.log("Express now listening @ http://localhost:"+port);
});


