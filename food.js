const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const food = express();

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});


const port = 80;
food.use('/static', express.static('static'))
food.use(express.urlencoded())
const contact = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    address: String
});

const cont = mongoose.model('Contact', contact);

food.get("/", (req, res)=>{
    const cnt = { }
    res.render('index.html',cnt)
});

food.post("/", (req, res)=>{
    var mydata = new cont(req.body)
    mydata.save().then(()=>{
        res.send("data saved")
    }).catch(()=>{
        res.status(400).send("data not saved")
    })
});

food.listen(port, ()=>{
    console.log(`this application started succesfully at ${port}`)
});