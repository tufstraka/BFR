<template>
    <div class="news-feed">
      <div v-for="(article, index) in articles" :key="index" class="article">
        <img :src="article.urlToImage" alt="Article Image" class="article-image" />
        <div class="article-details">
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-description">{{ article.description }}</p>
          <p class="article-author">By {{ article.author }}</p>
          <p class="article-published">Published: {{ formatDate(article.publishedAt) }}</p>
          <a :href="article.url" class="article-link">Read more</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        articles: []
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get(`https://newsapi.org/v2/everything?q=movies&from=2024-04-26&sortBy=publishedAt&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`);
          this.articles = response.data.articles;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleString();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  .news-feed {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .article {
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    display: flex;
  }
  
  .article-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 20px;
  }
  
  .article-title {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .article-description {
    margin-bottom: 10px;
  }
  
  .article-author {
    font-style: italic;
    margin-bottom: 5px;
  }
  
  .article-published {
    font-size: 0.8rem;
    margin-bottom: 5px;
  }
  
  .article-link {
    color: blue;
    text-decoration: none;
    font-weight: bold;
  }
</style>
  
  