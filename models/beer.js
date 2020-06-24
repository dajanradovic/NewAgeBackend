const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const beerSchema = new Schema({
        name : {
                type: String,
                required: [true, 'name field is required'],
                },
        price : {
                type: Number,
                required: [true, 'price is required']

        },
        quantity : {
            type: Number
           
    }   

});

const beer = mongoose.model('beer', beerSchema, 'beer');
module.exports = beer;