const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const alcoholicDrinksSchema = new Schema({
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

const alcoholicDrinks = mongoose.model('alcoholicDrinks', alcoholicDrinksSchema, 'alcoholicDrinks');
module.exports = alcoholicDrinks;