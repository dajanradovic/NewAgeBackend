const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
        contents : {
                type: Array
                
                },
        price : {
                type: Number
               

        },
        email : {
            type: String
           
    },

    table:{
            type:String
    },

    completed:{
            type:Boolean,
            default:false
    },
    time : { 
            type : Date, 
            default: Date.now 
        }

});

const orders = mongoose.model('orders', ordersSchema, 'orders');
module.exports = orders;