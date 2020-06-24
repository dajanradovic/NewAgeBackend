const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const nonAlcoholicDrinksSchema = new Schema({
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

const nonAlcoholicDrinks = mongoose.model('nonAlcoholicDrinks', nonAlcoholicDrinksSchema, 'nonAlcoholicDrinks');
module.exports = nonAlcoholicDrinks;