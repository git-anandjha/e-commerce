// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const router = express.Router();


router.get('/',(req,res,next)=>{
  res.render('./saveindex.ejs');

});
module.exports=router;
