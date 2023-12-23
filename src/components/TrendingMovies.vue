<template>
  <div class="trending-movies">
    <div class="caption">
      <h2>Trending Movies</h2>
    </div>

    <div class="movie-cards">
      <div v-for="movie in movies" :key="movie.id" class="card" @click="redirectToMovieDetails(movie.id)">
        <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster" />
        <div class="content">
          <h2>{{ movie.title || movie.name }}</h2>
          <span class="rating">Rating &#11088;:</span><span>{{ movie.vote_average }}</span>
          <p>{{ movie.release_date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TrendingMovies',
  data() {
    return {
      movies: [],
    };
  },

  methods: {
    async getData() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US`
        );

        this.movies = response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title || movie.name,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
        }));
      } catch (error) {
        console.error(error);
      }
    },

    getMoviePosterUrl(posterPath) {
      return `https://image.tmdb.org/t/p/original${posterPath}`;
    },

    redirectToMovieDetails(movieId) {
      //TO DO: Implement the logic to redirect to the movie details page
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style scoped>
.trending-movies {
  overflow-x: scroll;
}

.caption {
  margin: 12px 40px;
  background-color: #2596be;
  color: black;
  border-radius: 9px;
  max-width: 155px;
}

.caption h2 {
  margin-left: 3px;
  font-size: 16px;
  padding: 10px;
}

.movie-cards {
  display: flex;
  gap: 30px;
  padding: 20px;
  overflow-x: auto;
}

.card {
  display: flex;
  flex-direction: column;
  width: 150px;
  gap: 20px;
  background: beige;
  border-radius: 12px;
  transition: transform 350ms;
  color: black;
}

.card:hover {
  transform: scale(1.07);
}

.card img {
  width: 100%;
  border-radius: 10px;
  min-height: calc(150px * 1.5);
  height: calc(150px * 1.5);
  overflow: hidden;
}

.content {
  width: 100%;
  padding: 26px 10px 12px 10px;
  white-space: normal;
}

.content h2 {
  font-size: 1em;
  font-weight: 700;
  color: #000;
}

.content span, p {
  font-size: 0.8em;
}

@media only screen and (max-width: 600px) {
  .caption {
    margin-left: 22px;
  }
}
</style>

