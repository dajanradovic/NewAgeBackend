const express = require ('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');




router.get('/google',passport.authenticate('google', {
            scope:['profile']

}));

router.get('/logout', verifyToken, (req, res, next )=> {

    jwt.verify(req.token, 'secret_key', (err, obj) =>{
        if (err){

            res.sendStatus(403);
        }

        else{
            req.logOut();
            res.sendStatus(200);
        
            }

       


    })

})

router.get('/google/redirect', passport.authenticate('google'),(req, res)=>{
    console.log(req);
    jwt.sign({user: req.user}, 'secret_key', (err,token) =>{
        res.status(301).redirect("http://localhost:3000/desk/" + token);

    } )
    

})

function verifyToken(req, res, next){
    //console.log(req.headers.authorization);
const bearerHeader=req.headers.authorization
console.log(bearerHeader);
if (bearerHeader !== ''){
   const bearer= bearerHeader.split(' ');
    const bearerToken= bearer[1];
    req.token = bearerToken;

    next();
}
else {
        res.sendStatus(403);


}
}

module.exports=router;