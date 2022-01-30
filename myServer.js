'use strict';

// in our server we use require instead of import
//importing express- because its an Express server;
const express = require('express');

//how we use express from the docs
const app = express();


//must import dotenv before using process.env.PORT
require('dotenv').config();

//USE the port we want LOCALLY, and make this Deployable
const PORT = process.env.PORT || 3002;

//must import cors to use it
var cors = require('cors');
//must USE cors to hit server from other app;
app.use(cors());

//Require a package first install it
const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');

//Route
app.get('/weather', getWeather);
app.get('/movies', getMovies);


//listen to my server ;tell server to start listening for endpoints
app.listen(PORT, () => console.log(`listen on port ${PORT}`));


