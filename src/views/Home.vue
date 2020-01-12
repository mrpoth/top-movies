<template>
  <div class="home">
    <MovieCard
      v-on:add-watched="addToWatched"
      v-on:show-another="showAnother"
      v-bind:movies="movies"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import MovieCard from "@/components/MovieCard.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    MovieCard
  },
  data() {
    return {
      movies: {
        id: "",
        title: "",
        release_date: "",
        genres: [],
        rating: "",
        poster: "",
        randomResult: "",
        randomPage: "",
        overview: ""
      },
      watchedMovies: []
    };
  },
  methods: {
    addToWatched() {
      this.watchedMovies.push(this.movies.id);
    },
    showAnother() {
      this.getMovie();
    },
    getMovie(randomResult, randomPage) {
      //First, get one of the top-rated movies
      randomPage = Math.floor(Math.random() * 20);
      axios
        .get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=8a1d8477e658ad295f6cb31a24577b88&language=en-US&page=${randomPage}`
        )
        .then(res => {
          randomResult = Math.floor(Math.random() * 13);
          let movie = res.data.results[randomResult];
          this.movies.title = movie.title;
          this.movies.rating = movie.vote_average;
          this.movies.id = movie.id;
          (this.movies.poster = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`),
          this.movies.release_date = movie.release_date.slice(0, 4);
          this.movies.overview = movie.overview;
          console.log(res.data.results[0]);
          this.getGenres(movie.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getGenres(movieID) {
      //Now, a second request for the genres
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=8a1d8477e658ad295f6cb31a24577b88&language=en-US`
        )
        .then(res => {
          this.movies.genres = res.data.genres;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getMovie();
  }
};
</script>
<style>
body {
  background-color: #1b262c;
}
.home {
  color: #bbe1fa;
}
</style>
