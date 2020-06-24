const express = require ('express');
const router = express.Router();
const nodemailer = require("nodemailer");
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
var fs = require('fs');
const jwt = require('jsonwebtoken');




const NonAlcoholicDrinks = require('../models/nonAlcoholicDrinks');
const Beer = require('../models/beer');
const AlcoholicDrinks = require('../models/alcoholicDrinks');
const Snacks = require('../models/snacks');
const Orders = require ('../models/orders');




router.get('/nonAlcoholicDrinks', function (req, res, next){

    NonAlcoholicDrinks.find({}).select({"name" : 1, "price" :1}).then(function(data){
        console.log('bezalkoholna pića');
        res.send(data);


    })
});
router.get('/beer', function (req, res, next){

    Beer.find({}).select("-quantity").then(function(beer){
        console.log('tu');
        res.send(beer);


    })
});

router.get('/alcoholicDrinks', function (req, res, next){

    AlcoholicDrinks.find({}).select({"name" : 1, "price" :1}).then(function(data){
        console.log('tu');
        res.send(data);


    })
});

router.get('/snacks', function (req, res, next){

    Snacks.find({}).select("-quantity").then(function(data){
        console.log('tu');
        res.send(data);


    })
});

router.get('/getAllOrders', verifyToken, function (req, res, next){
    
    jwt.verify(req.token, 'secret_key', (err, obj) =>{
        if (err){

            res.sendStatus(403);
        }

        else{
            Orders.find({}).limit(20).then(function(data){
      
                res.send(data);
        
        
            })

        }


    })
    
});

router.post('/completeOrder', verifyToken, function (req, res, next){
    console.log(req.body.order._id);
    jwt.verify(req.token, 'secret_key', (err, obj) =>{
        if (err){

            res.sendStatus(403);
        }

        else{
            Orders.updateOne({ _id: req.body.order._id }, { $set: { completed: true } }).then(function(data){
      
                res.send("Order successffully completed");
        
        
            }).catch(err =>{

                res.send(404, err)
            });

        }


    })
    
});

router.post('/newOrder', function (req, res, next){

    if (req.body.contents == ''){

        res.send("logged err",404);

        
    }



    else{
    var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var order = new Orders(req.body);
    order.save();
    
    ejs.renderFile(path.join(__dirname, '../views/', "invoiceTemplate.ejs"), {date: date, id:order.id, contents:req.body.contents, price:req.body.price}, (err, data) => {
        if (err) {
              res.send(err);
        } else {
            let options = {
                "format": "A4",
                "footer": {
                    
                    "contents" : "<h3>Thank you for visiting NewAge Snack-Bar! Do come again! The Snack-Bar team!</h3>"
                },
                "margin": '0px'

               
            };
            
            pdf.create(data, options).toFile("report.pdf", function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("File created successfully");
                }
            });
        }
    });


   let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "dajo1986@gmail.com", // generated ethereal user
          pass: "enanoa2014", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: 'dajo1986@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: "Express test", // Subject line
        text: "Hellomy friend", // plain text body
        html: "<b>Hello world?</b>",// html body
        attachments:[ {filename: 'report.pdf', path: path.join(__dirname, '../', "report.pdf")
        
        }


        ] 
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    

    } 
});



function verifyToken(req, res, next){
  //  console.log(req.body.order.price);
       console.log(req.headers.authorization);
    const bearerHeader=req.headers.authorization
console.log(bearerHeader);
    if (bearerHeader !== ''){
       const bearer= bearerHeader.split(' ');
        const bearerToken= bearer[1];
        req.token=bearerToken;

        next();
    }
    else {
            res.sendStatus(403);


    }
}

module.exports = router;