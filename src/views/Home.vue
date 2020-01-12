<template>
  <div class="home">
    <MovieCard v-on:add-watched="addToWatched" v-on:show-another="showAnother" v-bind:movies="movies"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieCard from '@/components/MovieCard.vue'
import axios from 'axios'


export default {
  name: 'home',
  components: {
    MovieCard
  },
      data() {
    return {
      movies: 
        {
          id: '',
          title:'',
          release_date: '',
          genres: [],
          actors: [],
          rating: 8.9,
          poster: '',
        },
        watchedMovies:[],      
    }
  },
  methods: {
    addToWatched() {
      this.watchedMovies.push(this.movies.id)
    },
    showAnother() {
      //show random film from API
    }
  },
  mounted() {
         axios
     .get("https://api.themoviedb.org/3/movie/top_rated?api_key=8a1d8477e658ad295f6cb31a24577b88&language=en-US&page=1")
     .then(res => {
       let movie = res.data.results[0];
       this.movies.title = movie.title
       this.movies.rating = movie.vote_average
       this.movies.id = movie.id
       this.movies.poster = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
       this.movies.release_date = movie.release_date.slice(0,4)
       console.log(res.data.results[0])
      
     }).catch(err => {
       console.log(err)
     })
  }

}
</script>
