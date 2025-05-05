<template>
  <div class="trending-container container">
    <div class="section-header">
      <h2>Trending Movies</h2>
      <div class="scroll-buttons">
        <button @click="scrollLeft" class="scroll-btn">
          <span>&larr;</span>
        </button>
        <button @click="scrollRight" class="scroll-btn">
          <span>&rarr;</span>
        </button>
      </div>
    </div>
    
    <div class="movies-wrapper" ref="moviesContainer">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading movies...</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <button @click="getData" class="retry-btn">Try Again</button>
      </div>
      
      <div v-else class="movies-slider">
        <div 
          v-for="movie in movies_pics" 
          :key="movie.id" 
          class="movie-card"
        >
          <div class="poster">
            <img :src="movie.pic" :alt="movie.title || movie.name" />
            <div class="overlay">
              <div class="rating">
                <span class="stars">★ {{ formatRating(movie.vote_average) }}</span>
              </div>
              <button class="details-btn">View Details</button>
            </div>
          </div>
          <div class="movie-info">
            <h3>{{ movie.title || movie.name }}</h3>
            <p class="release-date">{{ formatDate(movie.release_date) }}</p>
          </div>
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
      movies_pics: [],
      loading: true,
      error: null
    };
  },

  methods: {
    async getData() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US`
        );
        
        let newMovies = []
        let newMoviesPics = []
        newMovies = response.data.results;
        let baseurl = "https://image.tmdb.org/t/p/original"

        for (let i = 0; i < newMovies.length; i++) {
          const pic = {
            Photoid: i, 
            pic: baseurl + newMovies[i].poster_path 
          };
          
          const MoviesPics = {
            ...pic,
            ...newMovies[i]
          }
          newMoviesPics.push(MoviesPics)
        }
        
        this.movies_pics = newMoviesPics;
        
      } catch (error) {
        console.log(error);
        this.error = "Failed to load trending movies";
      } finally {
        this.loading = false;
      }
    },
    
    formatRating(rating) {
      return rating ? rating.toFixed(1) : 'N/A';
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Release date unknown';
      
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    
    scrollLeft() {
      if (this.$refs.moviesContainer) {
        this.$refs.moviesContainer.scrollBy({ left: -300, behavior: 'smooth' });
      }
    },
    
    scrollRight() {
      if (this.$refs.moviesContainer) {
        this.$refs.moviesContainer.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  },

  created() {
    this.getData();
  },
};
</script>

<style scoped>
.trending-container {
  margin: 40px auto;
  padding: 0 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
  position: relative;
  padding-left: 16px;
}

.section-header h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: var(--primary-color);
  border-radius: 4px;
}

.scroll-buttons {
  display: flex;
  gap: 8px;
}

.scroll-btn {
  background-color: var(--background-primary);
  border: 1px solid #e1e1e1;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
}

.scroll-btn:hover {
  background-color: var(--primary-light);
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.scroll-btn span {
  font-size: 18px;
}

.movies-wrapper {
  overflow: hidden;
  position: relative;
}

.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
}

.loading-spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.error-container p {
  margin-bottom: 16px;
  color: var(--secondary-color);
}

.retry-btn {
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.movies-slider {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 0;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}

.movies-slider::-webkit-scrollbar {
  display: none;
}

.movie-card {
  flex: 0 0 auto;
  width: 180px;
  border-radius: 12px;
  overflow: hidden;
  scroll-snap-align: start;
  background-color: white;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-8px);
}

.poster {
  position: relative;
  overflow: hidden;
  height: 270px;
}

.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.movie-card:hover .poster img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.movie-card:hover .overlay {
  opacity: 1;
}

.rating {
  margin-bottom: 12px;
}

.stars {
  color: #FFD700;
  font-weight: 700;
}

.details-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 0;
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.details-btn:hover {
  background-color: darken(#2a41e8, 10%);
}

.movie-info {
  padding: 12px;
}

.movie-info h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.release-date {
  font-size: 14px;
  color: var(--text-light);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .scroll-buttons {
    align-self: flex-end;
  }
}
</style>