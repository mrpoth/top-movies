//Get requirements
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

//Use some of those requirements
const corsOptions = {
  origin: '*',
  credentials: true };

app.use(cors(corsOptions));
app.options('*', cors())

app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


//Set up passport 

app.use(passport.initialize());
app.use(passport.session());  

const User = require('./user')

passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Set up DB
// mongoose.connect('mongodb://movies_admin:yAfc0xvc3@db:27017',
//   {
//     useNewUrlParser: true,
//     autoIndex: true
//   })


//Define global consts

const port = process.env.NODE_PORT
const dbName = 'movies';
const db = mongoose.connection;
const Movie = require('./movie')


//Connect to db

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose connected')
});


//Define functions

function getWatchedMovies() {
  Movie.find({}, function (err, docs) {
    if (err) throw err;
    return docs;
  })
}


function insertMoviesToDb(movies) {
  Movie.create({ title: movies.title, tmdb_id: movies.id }, function (err) {
    if (err) return handleError(err);
  })
}

function getWatchedMovieIds() {
  Movie.find({}, function (err, docs) {
    if (err) throw err;
    let movies = docs;
    let movieIds = movies.map(movie => movie.tmdb_id)
  })
}
//Define routes


//Gets a movie from the API
app.get('/api/movie', (req, res) => {
  let randomPage = Math.floor(1 + Math.random() * 13);
  axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=8a1d8477e658ad295f6cb31a24577b88&language=en-US&page=${randomPage}`)
    .then(function (response) {
      randomResult = Math.floor(Math.random() * 20);
      let movie = response.data.results[randomResult]
      res.json(movie)
    }).catch(function (response) {
      console.log(response);
    });
})


//Gets a random movie from DB 
app.get('/api/movie/db', (req, res) => {
  Movie.aggregate([{ $sample: { size: 1 } }], function (err, result) {
    if (err) throw err;
    res.json(result);
  });
})

//Returns movies that user has watched
app.get('/api/movie/watched', (req, res) => {
  Movie.find({}, function (err, docs) {
    if (err) throw err;
    res.json(docs)
  })
})

//When user clicks on "Watched" in the front-end, movie gets stored. 
app.post('/api/movie/watched',  (req, res) => {
  // const movieRequest = req.body;
  // let dbMovie = new Movie({
  //   title: movieRequest.title,
  //   tmdb_id: movieRequest.movie_id,
    
  // })
  // dbMovie.save(function (err) {
  //   if (err) return handleError(err);
  // });
  console.log(req.user)
})

app.post('/register', (req, res) => {
    let newUser = new User({
      username: req.body.username,
    });
    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        throw err
      }
      passport.authenticate("local")(req, res, function () {
        console.log('success') 
      });

    });
})

app.post('/login' , passport.authenticate('local'), function(req, res) {
  console.log(`User ${req.user.username} is logged in`)
  res.send(req.user)
});

app.get('/users', (req, res) => {
  User.find({}, function (err, docs) {
    if (err) throw err;
    res.json(docs)
  })})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))