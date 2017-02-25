/**
 * @author Liavontsi Brechka
 * @studentID 300800345
 * @date April 25, 2017
 * @description Midterm test
 */

let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', gamesSchema);
