const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const homeroute=require('./routes/home.js')
const saveimage = require('./routes/image.js');

const app=express()
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))


//routes calling
app.use('/',homeroute)
app.use('/saveimage',saveimage)

app.listen(3000,(req,res)=>{
    console.log('runnning on 3000');
});
