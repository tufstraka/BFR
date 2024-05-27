<template>

  <div class='everything'>
  
    <div class='caption'>
    
      <h2>Trending movies </h2> 
        
    </div>
    
    <div class = "row">
      
      <div v-for="movie in movies_pics" v-bind:key="movie.id" class="card-container">
      
        <div class="card">
             <img :src="movie.pic"/>
        <!--<p>{{ post.overview }}</p>-->
            <div class="content">
              <h2>{{movie.title || movie.name }}</h2>
              <span class="rating">Rating &#11088; &#11088;:</span><span> {{ movie.vote_average }}</span>
              <p>{{movie.release_date }}</p>
            </div>  
        </div>
        
      </div>
      
   </div>
  
  
  </div>
   
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name:'TrendingMovies',
    data() {
      return {
        movies_pics: [],
      };
    },
  
    methods: {
      async getData() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US`
          );
          
          let newMovies = []
          let newMoviesPics = []
          newMovies = response.data.results;
          let baseurl = "https://image.tmdb.org/t/p/original"
  
          for (let i = 0; i < newMovies.length; i++){
          
            const pic = {
              Photoid: i, 
              pic: baseurl + newMovies[i].poster_path };
            
            const MoviesPics = {
              ...pic,
              ...newMovies[i]
            }
            newMoviesPics.push(MoviesPics)
          }
          
          this.movies_pics = newMoviesPics;
          
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
  body::-webkit-scrollbar{
      width: 1.26rem;
  }
  body::-webkit-scrollbar-thumb {
      background-color: #d6dee1;
      border-radius: 20px;
      border: 6px solid transparent;
      background-clip: content-box;
    }
  
  body::-webkit-scrollbar-track {
      background-color: transparent;
    }
    
  body::-webkit-scrollbar-thumb:hover {
      background-color: rgb(233, 48, 48);
    }  
  
  .row {
    display: flex;
  }
  
  .everything{
      overflow-y: hidden;
      overflow-x: scroll;
     }
  
  .caption {
    margin-top: 12px;
    margin-left: 40px;
    margin-bottom: 12px;
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
  
  .card {
    display: flex;
    flex-direction: column;
    width: 150px;
    gap: 20px;
    background: #d4dfc9;
    border-radius: 12px;
    transition: transform 350ms;
    margin-left: 30px;
    color: black;
    border-radius: 10px;
    
  }
  .card:hover{
      transform: scale(1.07);
    }
    
  .card img {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    width: 100%;
    border-radius: 10px;
    min-height: calc(150px * 1.5);
    height: calc(150px * 1.5);
    overflow: hidden;
  }  
  
  .content {
    width: 100%;
    padding: 26px 10px 12px 10px;
    padding-bottom: 12px;
    position: relative;
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
  
  @media only screen and (max-width: 600px){
    .caption{
      margin-left: 22px;
    }
  }
  
  </style>  
  