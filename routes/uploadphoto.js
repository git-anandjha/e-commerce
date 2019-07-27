// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');

const router = express.Router();
mongoose.connect("mongodb://localhost/imgphotoecom",{ useNewUrlParser: true });


//UPLOADING FILES TO THE "UPLOAD" FOLDER IN THE LOCAL FILE DIRECTORY
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'-'+file.originalname)
    }
})

var upload = multer({ storage: storage })

// USING MONGODB DATABASE AS A SERVER TO STORE THE THA DATA AND RETREVING THE DATA WHEN THE TIME COMES
router.post('/',upload.single('myImage'),(req,res)=>{
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // console.log(req.file);
    var finalImg = {
        name: String,
        image:new Buffer.from(encode_image,'base64')
    };

    const images=mongoose.model('image',finalImg)
    var image=new images
    // image.contentType=req.file.mimetype
    image.image=encode_image
    image.name=req.originalname
    image.save((err,res)=>{
        // console.log(err);
    })
    res.send('UpLOADED ')
    console.log(res);
})


module.exports=router;
