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
    addToWatched() {
      this.watchedMovies.title = this.movies.title;
      this.watchedMovies.movie_id= this.movies.id;

      axios.post("http://ec2-3-10-58-202.eu-west-2.compute.amazonaws.com:3000/api/movie/watched", {
        title: this.watchedMovies.title,
        movie_id: this.watchedMovies.movie_id,
      })
      .then(res => {
        return res.data
      }).catch(err => {
        console.log(err)
      })
      
    },
    showAnother() {
      this.getMovie();
    },
    getMovie() {
      //First, get one of the top-rated movies
      axios
        .get(
          "http://ec2-3-10-58-202.eu-west-2.compute.amazonaws.com:3000/api/movie"
        )
        .then(res => {
          let movie = res.data
          this.movies.title = movie.title;
          this.movies.rating = movie.vote_average;
          this.movies.id = movie.id;
          this.movies.poster = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
          this.movies.release_date = movie.release_date.slice(0, 4);
          this.movies.overview = movie.overview;
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