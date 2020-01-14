const express = require('express')
const cors = require('cors')
const axios = require('axios')
const pgp = require('pg-promise')(/* options */);
const bodyParser = require('body-parser');
const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 3000

const db = pgp('postgres://feleg:addpeople123@localhost:5432/movies_api')

app.get('/api/movie', (req, res) => {
    let randomPage = Math.floor(1 + Math.random() * 20);
        axios
            .get(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=8a1d8477e658ad295f6cb31a24577b88&language=en-US&page=${randomPage}`
                )
        .then(response => {
            randomResult = Math.floor(Math.random() * 13);
            res.json(response.data.results[randomResult])
        })
        .catch(err => {
          console.log(err);
        });
})

app.get('/api/movie/watched-movies', (req, res) => {
    db.any('SELECT * FROM watched_movies')
    .then(data => {
        res.json(data)
    })
})


app.post('/api/movie/watched', (req, res) => {
    db.none('INSERT INTO watched_movies(title, movie_id) VALUES($1, $2)' , [`${req.body.title}`, `${req.body.movie_id}`])
    .then( data => {
        console.log(data)

    }).catch(error => {
        console.log(error)
    })
    console.log(req.body)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))