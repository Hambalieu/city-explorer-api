'use strict';

// in our server we use require instead of import
//importing express- because its an Express server;
const express = require('express');

//how we use express from the docs
const app = express();
const weatherData = require('./data/weather.json');

//must import dotenv before using process.env.PORT
require('dotenv').config();

//USE the port we want LOCALLY, and make this Deployable
const PORT = process.env.PORT || 3001;

//must import cors to use it
var cors = require('cors');
//must USE cors to hit server from other app;
app.use(cors());


//route.
app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;

  let filteredCity = weatherData.find(cityweather => cityweather.city_name.toLowerCase() === searchQuery);

  let groomedWeather = filteredCity.data.map(day => new Forecast(day));

  response.send(groomedWeather);
});


// catch all route -error message for when we hit a route that doesnt exit
// app.get('*',(request, response) =>{
//   response.status.apply(404).send('the route you entered is not what you looking for.');
// });

class Forecast {
  constructor(day) {
    this.lowTemp = day.low_temp;
    this.maxTemp = day.max_temp;
    this.description = day.weather.description;
    this.date = day.valid_date;

  }
}
//listen to my server ;tell server to start listening for endpoints
app.listen(PORT, () => console.log(`listen on port ${PORT}`));


