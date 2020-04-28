<template>
  <div>
    <img class="movie-poster" :src="movies.poster" />
    <h2 v-text="movies.title"></h2>
    <h3>({{ movies.release_date }})</h3>
    <ul>
      <li v-for="genre in movies.genres" v-bind:key="genre.id">{{ genre.name }}</li>
    </ul>
    <h5 v-bind="movies">Rating: {{ movies.rating }}</h5>
    <div class="story-overview">
      <p v-text="movies.overview"></p>
    </div>
    <div>
      <!-- <button @click="$emit('add-watched')" class="btn" :disabled="disabled">
        Watched
      </button>-->
    </div>
    <div>
      <button @click="$emit('show-another')" class="btn">Show Another</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: ["movies"],
  data() {
    return {
      disabled: false
    };
  }
};
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

.movie-poster {
  width: 100%;
  height: auto;
  max-width: 280px;
  box-shadow: 1px 1px 20px 3px #828282;
  border-radius: 5px;
}

@media (min-width: 1025px) {
  .story-overview {
    max-width: 35%;
    margin: 0 auto;
  }
}
@media (max-width: 768px) {
  .movie-poster {
    max-width: 180px;
  }
}
</style>
