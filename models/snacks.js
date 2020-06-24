const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const snacksSchema = new Schema({
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

const snacks = mongoose.model('snacks', snacksSchema, 'snacks');
module.exports = snacks;