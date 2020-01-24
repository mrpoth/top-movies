//Get requirements
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://movies_admin:yAfc0xvc3@db:27017'
app.use(cors())
app.use(bodyParser.json())

//Define global consts
const port = 3000
const dbName = 'movies';

//Define functions

function getWatchedMovies(callBack) {
  MongoClient.connect(url).then(client => {
    let db = client.db(dbName);
    db.collection("watched").find({}).toArray(function (err, result) {
      if (err) throw err;
      client.close();
      return callBack(result);
    });
  }).catch(error => {
    console.log('ERROR:', error);
  });
}


function insertMoviesToDb(movie) {
  MongoClient.connect(url).then(client => {
    let db = client.db(dbName);
    db.collection("movies").update({title: movie.title}, {movie}, {upsert: true})
    client.close();
  }).catch(error => {
    console.log('ERROR:', error);
  });
}


//Define routes


//Gets a movie from the API and inserts to DB
app.get('/api/movie', (req, res) => {
  let randomPage = Math.floor(1 + Math.random() * 13);
  axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=8a1d8477e658ad295f6cb31a24577b88&language=en-US&page=${randomPage}`)
  .then(function (response) {
    randomResult = Math.floor(Math.random() * 20);
    let movie = response.data.results[randomResult]
    insertMoviesToDb(movie)
    res.json(movie)
  }).catch(function (response) {
    console.log(response);
  });
})


//Gets a random movie from DB (front-end gets movies from here)
app.get('/api/movie/db', (req, res) => {

  MongoClient.connect(url).then(client => {
    const db = client.db(dbName);
    db.collection("movies").aggregate([ { $sample: { size: 1 } } ]).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
  }).catch(error => {
    console.log('ERROR:', error);
  });
})

//Returns movies that user has watched. Not currently working
app.get('/api/movie/watched', (req, res) => {
  MongoClient.connect(url).then(client => {
    const db = client.db(dbName);
    db.collection("watched").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
  }).catch(error => {
    console.log('ERROR:', error);
  });
})

//When user clicks on "Watched" in the front-end, movie gets stored. 
app.post('/api/movie/watched', (req, res) => {
  MongoClient.connect(url).then(client => {
    const db = client.db(dbName);
    const movie = req.body;
    db.collection("watched").insertOne(movie, function (err, result) {
      if (err) throw err;
      console.log(result.result)
      client.close();
    });
  }).catch(error => {
    console.log('ERROR:', error);
  });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))