const express = require ('express');
const routes = require ('./routes/api');
const authRoutes = require ('./routes/auth');
const bodyParser = require('body-parser'); 
const mongoose = require ('mongoose');
const Beer = require('./models/beer');
const cookieSession= require ('cookie-session');
const passport = require ('passport');
var cors = require('cors')
var socket = require('socket.io');
const passportSetup= require ('./config/passport-setup')



const app = express();
app.set('view engine', 'ejs');
app.use(cors());


app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys:['dajanKey']


}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


var server = app.listen(process.env.port || 4000, function(){


    console.log('listening for requests');


})
var io = socket(server);
mongoose.connect('mongodb://127.0.0.1:27017/NewAgeBackend');
let db = mongoose.connection;
db.once('open', function(){

    console.log('connected');
})
mongoose.Promise=global.Promise;
app.use('/auth',authRoutes);

app.use('/api',routes);


io.on('connection', function(socket) {


        socket.on('orderPlaced', function(data){
            console.log('u socketu smo');
            io.sockets.emit('orderReceived');
        })
       
});


