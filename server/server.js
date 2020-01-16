require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser');
const mysql = require('mysql')
const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 3000


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

// connection.query('SELECT * FROM watched_movies', function (error, rows, fields) {
//   let movieIds = [];
//   rows.forEach(rows => {
//     movieIds.push(rows.movie_id)
//     return movieIds
//   })
// })

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

app.get('/api/movie/watched', (req, res) => {

connection.query('SELECT * FROM watched_movies', function (error, rows, fields) {
        res.json(rows)
        if(error) {
          console.log(error)
        }
})


})


app.post('/api/movie/watched', (req, res) => {
    console.log(req.body)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))