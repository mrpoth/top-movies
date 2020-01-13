const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))