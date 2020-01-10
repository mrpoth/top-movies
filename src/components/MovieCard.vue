<template>
<div>
<img class="movie-poster" src="https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_.jpg">
<h2 v-text="movies.title"></h2>
<h2>({{movies.release_date}})</h2>
<h4>Actors:</h4>
<ul>
<li v-for="actor in movies.actors" v-bind:key="actor.id">{{actor}}</li>
</ul>
<h4>Genres:</h4>
<ul>
<li v-for="genre in movies.genres" v-bind:key="genre.id">{{genre}}</li>
</ul>
<h5 v-bind="movies">Rating: {{movies.rating}} | Top 250: #{{movies.position}}</h5>
<div><button class="btn">Watched</button></div>
<div><button class="btn">Show Another</button></div>

</div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: ['movies']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.movie-poster {
  width:100%;
  height:auto;
  max-width:280px;
  box-shadow: 6px 10px 5px 0px rgba(0,0,0,0.75);
  border: 5px solid black;
}

.btn {
  background-color:black;
  border:none;
  color:white;
  border-radius:5px;
  padding:5px;
  margin: 5px auto;
}
</style>
