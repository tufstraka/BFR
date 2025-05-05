<template>
  <section class="movies-section">
    <div class="container">
      <header class="section-header">
        <h2 class="section-title">Trending Movies</h2>
        <div class="navigation-controls">
          <button 
            @click="scrollLeft" 
            class="nav-button prev" 
            :class="{ 'disabled': isScrollAtStart }"
            aria-label="Previous movies"
          >
            <svg viewBox="0 0 24 24" class="nav-icon">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button 
            @click="scrollRight" 
            class="nav-button next" 
            :class="{ 'disabled': isScrollAtEnd }"
            aria-label="Next movies"
          >
            <svg viewBox="0 0 24 24" class="nav-icon">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
      </header>
      
      <div 
        class="movies-container" 
        ref="moviesContainer"
        @scroll="checkScrollPosition"
      >
        <div v-if="loading" class="status-message loading">
          <div class="spinner"></div>
          <p>Fetching the latest trending movies...</p>
        </div>
        
        <div v-else-if="error" class="status-message error">
          <svg class="error-icon" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <p>{{ error }}</p>
          <button @click="getData" class="retry-button">
            Try Again
          </button>
        </div>
        
        <div v-else class="movies-row">
          <div 
            v-for="movie in movies_pics" 
            :key="movie.id" 
            class="movie-card"
            @click="viewMovieDetails(movie)"
          >
            <div class="poster-wrapper">
              <div class="poster-image">
                <img 
                  :src="movie.pic" 
                  :alt="movie.title || movie.name"
                  loading="lazy"
                />
              </div>
              <div class="poster-overlay">
                <div class="rating-badge">
                  <svg class="star-icon" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <span>{{ formatRating(movie.vote_average) }}</span>
                </div>
                <button class="view-button">
                  View Details
                </button>
              </div>
            </div>
            <div class="movie-info">
              <h3 class="movie-title">{{ movie.title || movie.name }}</h3>
              <p class="movie-date">{{ formatDate(movie.release_date) }}</p>
            </div>
          </div>
          
          <!-- Empty space at the end for better scrolling experience -->
          <div class="scroll-spacer"></div>
        </div>
      </div>
      
      <!-- Scroll progress indicator -->
      <div class="scroll-progress">
        <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TrendingMovies',
  data() {
    return {
      movies_pics: [],
      loading: true,
      error: null,
      isScrollAtStart: true,
      isScrollAtEnd: false,
      scrollProgress: 0
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
        
        const newMovies = response.data.results;
        const baseurl = "https://image.tmdb.org/t/p/w500";
        
        this.movies_pics = newMovies.map((movie, index) => {
          return {
            Photoid: index,
            pic: baseurl + movie.poster_path,
            ...movie
          };
        });
        
      } catch (error) {
        console.error("API Error:", error);
        this.error = "Unable to load trending movies. Please try again later.";
      } finally {
        this.loading = false;
        // Allow time for DOM to update before checking scroll
        this.$nextTick(() => {
          this.checkScrollPosition();
        });
      }
    },
    
    formatRating(rating) {
      return rating ? rating.toFixed(1) : 'N/A';
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Coming Soon';
      
      const options = { year: 'numeric', month: 'short' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    
    scrollLeft() {
      if (this.$refs.moviesContainer && !this.isScrollAtStart) {
        const container = this.$refs.moviesContainer;
        const scrollAmount = container.clientWidth * 0.8;
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    },
    
    scrollRight() {
      if (this.$refs.moviesContainer && !this.isScrollAtEnd) {
        const container = this.$refs.moviesContainer;
        const scrollAmount = container.clientWidth * 0.8;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    },
    
    checkScrollPosition() {
      if (!this.$refs.moviesContainer) return;
      
      const container = this.$refs.moviesContainer;
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // Update scroll state
      this.isScrollAtStart = scrollLeft <= 10;
      this.isScrollAtEnd = maxScroll - scrollLeft <= 10;
      
      // Calculate scroll progress percentage
      this.scrollProgress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    },
    
    viewMovieDetails(movie) {
      // Handle movie click - you can add navigation here
      console.log('Movie clicked:', movie.title || movie.name);
      // Example: this.$router.push({ name: 'MovieDetails', params: { id: movie.id } })
    }
  },

  created() {
    this.getData();
  },
  
  mounted() {
    // Add resize listener to check scroll position on window resize
    window.addEventListener('resize', this.checkScrollPosition);
  },
  
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScrollPosition);
  }
};
</script>

<style lang="scss" scoped>
// Modern color scheme with CSS variables
:root {
  --primary: #6c5ce7;
  --primary-dark: #5649c0;
  --primary-light: #a29bfe;
  --accent: #fd79a8;
  --text-primary: #2d3436;
  --text-secondary: #636e72;
  --text-tertiary: #b2bec3;
  --background: #ffffff;
  --surface: #f8f9fa;
  --border: #edf2f7;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 24px rgba(0,0,0,0.12);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

.movies-section {
  padding: 60px 0;
  
  @media (max-width: 768px) {
    padding: 40px 0;
  }
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  position: relative;
  padding-left: 16px;
  margin: 0;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    bottom: 8px;
    width: 4px;
    background: linear-gradient(to bottom, var(--primary), var(--accent));
    border-radius: 4px;
  }
  
  @media (max-width: 576px) {
    font-size: 24px;
  }
}

.navigation-controls {
  display: flex;
  gap: 12px;
  
  @media (max-width: 576px) {
    align-self: flex-end;
  }
}

.nav-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
  box-shadow: var(--shadow-sm);
  
  &:hover:not(.disabled) {
    background-color: var(--primary-light);
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    
    .nav-icon {
      fill: var(--primary-dark);
    }
  }
  
  &:active:not(.disabled) {
    transform: translateY(0);
  }
  
  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  
  .nav-icon {
    width: 24px;
    height: 24px;
    fill: var(--text-secondary);
    transition: var(--transition-fast);
  }
}

.movies-container {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0 -24px;
  padding: 16px 24px;
  scroll-behavior: smooth;
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, Opera */
  }
}

.movies-row {
  display: flex;
  gap: 20px;
}

.status-message {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  padding: 24px;
  
  p {
    font-size: 16px;
    color: var(--text-secondary);
    margin: 16px 0;
  }
  
  &.loading {
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(108, 92, 231, 0.1);
      border-left-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
  
  &.error {
    .error-icon {
      width: 48px;
      height: 48px;
      fill: var(--accent);
    }
  }
}

.retry-button {
  margin-top: 16px;
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
  
  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);
  }
}

.movie-card {
  flex: 0 0 auto;
  width: 180px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: white;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-normal);
  cursor: pointer;
  
  @media (min-width: 768px) {
    width: 200px;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-lg);
    
    .poster-overlay {
      opacity: 1;
    }
    
    .poster-image img {
      transform: scale(1.1);
    }
  }
}

.poster-wrapper {
  position: relative;
  padding-top: 150%;
  overflow: hidden;
}

.poster-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }
}

.poster-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.8) 0%, 
    rgba(0, 0, 0, 0.4) 50%, 
    rgba(0, 0, 0, 0.1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.rating-badge {
  align-self: flex-start;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 10px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  
  .star-icon {
    width: 16px;
    height: 16px;
    fill: #ffd700;
    margin-right: 4px;
  }
}

.view-button {
  width: 100%;
  padding: 10px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
  
  &:hover {
    background-color: var(--primary-dark);
  }
}

.movie-info {
  padding: 16px;
}

.movie-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-date {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.scroll-spacer {
  flex: 0 0 24px;
}

.scroll-progress {
  margin-top: 20px;
  height: 4px;
  background-color: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, var(--primary), var(--accent));
  transition: width var(--transition-fast);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>