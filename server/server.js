//Get requirements
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express()

//Use some of those requirements
const corsOptions = {
  origin: '*',
  credentials: true };

app.use(cors(corsOptions));
app.options('*', cors())

app.use(bodyParser.json())


//Define global consts

const port = process.env.NODE_PORT || process.env.PORT
const apiKey = process.env.VUE_APP_TMDB_KEY

function getGenres(movieID) {
 return  axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
    .then(function (response) {
      let genres = response.data.genres
      return genres
    }).catch(function (response) {
      console.log(response);
    });
}

//Gets a movie from the API
app.get('/api/movie', (req, res) => {
  let randomPage = Math.floor(1 + Math.random() * 13);
  axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${randomPage}`)
    .then(function (response) {
      let randomResult = Math.floor(Math.random() * 20);
      let movie = response.data.results[randomResult]
      return movie
    }).then(function (response) {
     let movie = response;
      getGenres(movie.id)
      .then((genres) => res.json({movie, genres}))
    }).catch(function (response) {
      console.log(response);
    });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))