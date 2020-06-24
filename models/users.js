const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
        username : {
                type: String,
               
                },
        googleId : {
                type: String,
              

        }
       

});

const users = mongoose.model('users', usersSchema, 'users');
module.exports = users;