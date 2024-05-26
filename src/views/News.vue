<template>
  <div>
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
    <div v-else class="news-feed">
      <div v-for="(article, index) in filteredArticles" :key="index" class="article">
        <img :src="article.urlToImage" alt="Article Image" class="article-image" />
        <div class="article-details">
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-description">{{ article.description }}</p>
          <p class="article-author">By {{ article.author }}</p>
          <p class="article-published">Published: {{ formatDate(article.publishedAt) }}</p>
          <a :href="article.url" class="article-link" target="_blank">Read more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      articles: [],
      loading: false // Add loading state
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true; 
      try {
        const response = await axios.get('https://newsapi-7zks.onrender.com/newss');
        this.articles = response.data.articles;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false; // Set loading to false after fetching data
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
  computed: {
    filteredArticles() {
      return this.articles
        .filter(article => article.urlToImage) 
        .slice(0, 10); 
    }
  }
};
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #007BFF;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.news-feed {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.article {
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.article:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.article-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.article-details {
  padding: 15px;
}

.article-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.article-description {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #555555;
}

.article-author, .article-published {
  font-size: 0.875rem;
  color: #888888;
  margin-bottom: 5px;
}

.article-link {
  display: inline-block;
  margin-top: 10px;
  color: #007BFF;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.article-link:hover {
  color: #0056b3;
}
</style>