const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Promise = require('promise');
const router = express.Router();

// router.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/imgphotoecom";

router.get('/',(req,res)=>{
    MongoClient.connect(url,{ useNewUrlParser: true },function(err, db) {
        if (err) throw err;
        var dbo=db.db('imgphotoecom')
        const promiseconst = new Promise(function(resolve, reject) {
            const bufferarray=[]
            dbo.collection('images').find().forEach(function(myDoc){
                const dataphoto=myDoc.image.data.buffer.toString('ascii')
                const name=myDoc.name
                console.log(name);
                bufferarray.push(dataphoto)
                anand='anand'
                resolve(bufferarray)
            })
        })
        promiseconst.then((result,anand)=>{
            res.render('showmultiple.ejs',{result:result});
            console.log(result.length)
        })
    })
})

module.exports=router;
