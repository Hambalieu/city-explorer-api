'use strict';

const axios = require('axios');

async function getMovies(request, response) {
  try {
    let location = request.query.location;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}&include_adult=false`;

    const movieData = await axios.get(url);
    let groomedMovies = movieData.data.results.map(movie => new Movie(movie));
    response.send(groomedMovies);
  }

  catch (error) { response.send('error'); }
}

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.image_url = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150/FFFF00/00000';
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }

}


module.exports = getMovies;
