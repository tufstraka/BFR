<template>
  <div>
    <ul v-for="movie in movies" v-bind:key="movie.id">
      <li>{{ movie.title }}</li>
      <p>{{ movie.body }}</p>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
    };
  },

  methods: {
    async getData() {
      try {
      
      // TO DO: Implement API request to TMDB
        let response = await fetch("??");
        this.movies = await response.json();;
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style lang='scss' scoped>
</style>
