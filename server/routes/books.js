/**
 * @author Liavontsi Brechka
 * @studentID 300800345
 * @date April 25, 2017
 * @description Midterm test
 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // rendering an empty details page
    res.render('books/details', {
        title: 'Add Book Details',
        books: {}
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // instantiating a new book model based on form parameters
    let newBook = book({
        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    // creating a new book document in database
    book.create(newBook, (err, book) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/books');
        }
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    try {
        // get a reference to the id from the url
        let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one game by its id
        book.findById(id, (err, books) => {
            if(err) {
                console.log(err);
                res.end(error);
            } else {
                // show the game details view
                res.render('books/details', {
                    title: 'Book Details',
                    books: books
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.redirect('/errors/404');
    }
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // id from URL
    let id = req.params.id;

    // instantiating a new book model based on form parameters
    let updatedBook = book({
        "_id": id,
        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    // updating a book document in database
    book.update({_id: id}, updatedBook, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/books');
        }
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // id from URL
    let id = req.params.id;

    // removing book document from db
    book.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/books');
        }
    });
});


module.exports = router;
