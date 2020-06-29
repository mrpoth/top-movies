<template>
  <div class="home" id="home">
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
      apiKey: process.env.VUE_APP_TMDB_KEY,
      movies: {
        id: "",
        title: "",
        release_date: "",
        genres: [],
        rating: "",
        poster: "",
        overview: ""
      },
      watchedMovies: [{
        title: "",
        movie_id: ""
      }]
    };
  },
  methods: {  
    showAnother() {
      this.getMovie();
    },
    getMovie() {
      //First, get one of the top-rated movies
      axios
        .get(
          "http://moviesroulette.com:3000/api/movie"
        )
        .then(res => {
          let movie = res.data.movie
          this.movies.title = movie.title;
          this.movies.rating = movie.vote_average;
          this.movies.id = movie.id;
          this.movies.poster = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
          this.movies.release_date = movie.release_date.slice(0, 4);
          this.movies.overview = movie.overview;
          this.movies.genres = res.data.genres
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getMovie();
  }
};
</script>