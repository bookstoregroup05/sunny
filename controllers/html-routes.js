const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
// var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
// module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads home.html
  router.get("/", function(req, res) {
    // if (req.user) {
      res.redirect("/home");
    // } else {
      // res.render('signup', {js: ['signup.js']});
    // }
  });

  router.get("/login", function(req, res) {
    // if (req.user) {
      // res.redirect("/home");
    // } else {
      res.render('login', {js: ['login.js']});
    // }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  router.get("/home",  withAuth, (req, res) =>{
    // res.sendFile(path.join(__dirname, "../public/views/home.html"));
    res.render('home', {js: ['home.js'],loggedIn: true });
  });


  // browse route loads browse.html
  router.get("/browse",  withAuth,
  // isAuthenticated,
  function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/views/browse.html"));
    res.render('browse', {js: ['books.js'],loggedIn: true });
  });
  router.get('/search/', (req, res) => {
   
    res.render('search', {js: ['search.js'],loggedIn: true });
  });
  // cart route loads cart.html
  router.get("/cart",  withAuth,
  // isAuthenticated, 
  function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/views/cart.html"));
    res.render('cart', {js: ['shoppingcarts.js'],loggedIn: true });
  });

  module.exports = router;