const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();


// router.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/imgphotoecom";

router.get('/',(req,res)=>{
    MongoClient.connect(url,{ useNewUrlParser: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db("imgphotoecom");
        dbo.collection("images").findOne({}, function(err, result) {
            if (err) throw err;
            resultobj=result
            console.log(result.image.data.buffer.toString('ascii'))
            db.close();
            // console.log(result);
            const stringdata=result.image.data.buffer.toString('ascii')
            // res.sendFile(<img src="data:image/png;base64,result.image.data" alt="image">)
            res.render('photos.ejs',{photo:stringdata});
            console.log(stringdata);
        })
    })
})
module.exports=router;
