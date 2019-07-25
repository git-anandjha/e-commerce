const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');


const app=express()
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.listen(3000,(req,res)=>{
    console.log('runnning on 3000');
});
