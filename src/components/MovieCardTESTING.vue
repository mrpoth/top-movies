<template>
<div>
<img class="movie-poster" src="https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_.jpg">
<h2 v-text="movie.title"></h2>
<h2>({{movie.release_date}})</h2>
<h4>Actors: Ryan Gosling, Harrison Ford</h4>
<h5>Rating: 8.9 | Top 250: #10</h5>
<div><button class="btn">Watched</button></div>
<div><button class="btn">Show Another</button></div>
<h3></h3>
<h3 v-for="movie in movies" v-bind:key="movie"></h3>

</div>
</template>