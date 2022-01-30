'use strict';

const axios = require('axios');

let cache = {};

async function getMovies(request, response) {
  try {
    let location = request.query.location;

    let key = location + 'location';

    if (cache[key] && Date.now() - cache[key].timestamp < (1000 * 10)) {
      console.log('cache hit!');
      response.send(cache[key].data);
      console.log('this is the cache', cache);
    } else {
      console.log('cache miss');

      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}&include_adult=false`;

      const movieData = await axios.get(url);
      let groomedMovies = movieData.data.results.map(movie => new Movie(movie));

      cache[key] = {
        data: groomedMovies,
        timestamp: Date.now()
      };

      response.send(groomedMovies);
    }
  } catch (error) { response.send('error'); }

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
