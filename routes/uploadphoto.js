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

//creating schema and oother options togelp the model to floueos
var finalImg = new mongoose.Schema({
    name: String,
    image: { data: Buffer, contentType: String }
});

const images=mongoose.model('image',finalImg)

// USING MONGODB DATABASE AS A SERVER TO STORE THE THA DATA AND RETREVING THE DATA WHEN THE TIME COMES
router.post('/',upload.single('myImage'),(req,res)=>{
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    const contentType=req.file.mimetype
    const name=req.file.originalname

    var imagedata={
        name:name,
        image:{data:encode_image,contentType:contentType}
    }
    images.create(imagedata, function(err, newdata){
        console.log(newdata);
        if(err){
            console.log(err);
        } else {
            res.send('UpLOADED');
        }
    })
})

module.exports=router;
