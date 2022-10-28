<template >
<div  class="container">

    <div class="grid1">
    <img :src='movies_pics[0].pic'/>
  </div>
  <div class="grid2">
    <img :src='movies_pics[1].pic'/>
  </div>
  <div class="grid3">
    <img :src='movies_pics[2].pic'/>
  </div>
  <div class="grid4">
    <img :src='movies_pics[3].pic'/>
  </div>
  <div class="grid5">
    <img :src='movies_pics[4].pic'/>
  </div>
    
  
  
  
</div>  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies_pics: [],
    };
  },

  methods: {
    async getData() {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/tv/popular?api_key=3968a7344aff40a0b95a4eac0cef53bb&language=en-US"
        );
        let newMovies = []
        let newMoviesPics = []
        let articlePics = [];
        newMovies = response.data.results;
        let baseurl = "https://image.tmdb.org/t/p/original"

        for (let i = 0; i < newMovies.length; i++){
          const pic = {
            Photoid: i, 
            pic: baseurl +                newMovies[i].poster_path };
          
          const MoviesPics = {
            ...pic,
            ...newMovies[i]
          }
          newMoviesPics.push(MoviesPics)
        }

        for (let i = 0; i < 5; i++)
          {
            articlePics.push(newMoviesPics[i])
          }
        
        this.movies_pics = articlePics;
        
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

<style scoped>

.container{
  display: grid;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 50% 50%;
  height: 800px;
}
.grid1 {
  margin: 5px;
}
img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 9px;
  }
.grid2 {
  grid-row: 2 / 3;
  margin: 5px;
}

.grid3{
  grid-row: 1 / 3;
  margin: 5px;
}

.grid4{
  margin: 5px;
}
.grid5{
  grid-row: 2 / 3;
  margin: 5px;
}

@media only screen and (max-width: 600px) {
  .container {
    display: flex;
    flex-direction: column;
  }
}
</style>
