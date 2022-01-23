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


//import weather data from json

const axios = require('axios');

app.get('/weather', getWeather);
app.get('/movies', getMovies);

async function getWeather(request, response) {
  let lat = request.query.lat;
  let lon = request.query.lon;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I`;

  const weatherData = await axios.get(url);
  let groomedWeather = weatherData.data.data.map(day => new Forecast (day));
  response.send(groomedWeather);
}

async function getMovies(request, response) {
  let location = request.query.location;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}&include_adult=false`;

  const movieData = await axios.get(url);
  let groomedMovies = movieData.data.results.map(movie => new Movie (movie));
  response.send(groomedMovies);
}

class Forecast {
  constructor(day){
    this.lowTemp = day.low_temp;
    this.maxTemp = day.max_temp;
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}
class Movie {
  constructor(movie){
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.image_url = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'https://via.placeholder.com/150/FFFF00/00000' ;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }

}

//listen to my server ;tell server to start listening for endpoints
app.listen(PORT, () => console.log(`listen on port ${PORT}`));


