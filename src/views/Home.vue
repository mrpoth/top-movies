<template>
  <div class="home">
    <MovieCard v-bind:movies="movies"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'home',
  components: {
    MovieCard
  },
      data() {
    return {
      movies: 
        {
          id: 10,
          title:'Blade Runner 2049',
          release_date: '2017',
          genres: ['Action', 'Drama', 'Mystery'],
          actors: ['Ryan Gosling', 'Harrison Ford'],
          rating: 8.9,
          position: 10
        }
      
    }
  }

}
</script>
