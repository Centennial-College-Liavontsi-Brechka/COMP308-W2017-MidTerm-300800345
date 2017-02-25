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

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: '',
    displayName: req.user ? req.user.displayName : ''
   });
});

//------------------------------------AUTHORIZATION ROUTES------------------------------------
let passport = require('passport');

// defining the user model
let User = require('../models/users');

// GET login request
router.get('/login', (req, res, next) => {
    // check to see if the user is not already logged in
    if(!req.user) {
        // render the login page
        res.render('auth/login', {
            title: "Login",
            books: {},
            messages: req.flash('loginErrorMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
        return;
    } else {
        return res.redirect('/books');
    }
});

// POST login request
router.post('/login', passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/login',
    failureFlash : {type: 'loginErrorMessage', message: 'Invalid username or password.' }
}));

// GET register request
router.get('/register', (req, res, next) => {
    // check to see if the user is not already logged in
    if(!req.user) {
        // render the registration page
        res.render('auth/register', {
            title: "Register",
            books: {},
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
        return;
    } else {
        return res.redirect('/books');
    }
});

// POST register request
router.post('/register', (req, res, next) => {
    User.register(
        new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            displayName: req.body.displayName
        }),
        req.body.password,
        (err) => {
            if(err) {
                console.log('Error inserting new user');
                if(err.name == "UserExistsError") {
                    req.flash('registerMessage', 'Registration Error: User Already Exists');
                }
                return res.render('auth/register', {
                    title: "Register",
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });
            }
            // if registration is successful
            return passport.authenticate('local') (req, res, () => {
                res.redirect('/books');
            });
        });
});

// GET logout request
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
