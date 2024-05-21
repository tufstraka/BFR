<template>
  <div class="home">
    <BlogPost v-if="!user" :post='welcomeScreen'/>
    
    <div v-if="user">
      <TrendingMovies />
    </div>
    
    <div v-if="user">
      <BlogPost :post='post' v-for="(post, index) in blogPostsFeed" :key="index" />
    </div>
    
    <div v-if="user" class="blog-card-wrap">
      <div class="container">
        <vue-particles
          color="#dedede"
          :particleOpacity="0.7"
          :particlesNumber="60"
          shapeType="triangle"
          :particleSize="4"
          linesColor="#dedede"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
          class='vue'
        />      
        <h1 class="title">Recent Reviews</h1>
        <div class='blog-cards'>
          <BlogCards :post='post' v-for="(post, index) in blogPostsCards" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue';
import BlogCards from '../components/BlogCard.vue';
import TrendingMovies from '../components/TrendingMovies.vue';

export default {
  name: "Home",
  components: { BlogPost, BlogCards, TrendingMovies },
  data() {
    return {
      welcomeScreen: {
        title: "Niaje",
        blogPost: "Do you like watching movies and TV shows? Do you always feel like you want to rant or just express your opinions? Welcome to BFR.",
        welcomeScreen: true,
        photo: "movie1"
      },
    };
  },
  computed: { 
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },
    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang='scss' scoped>
.home {
  background: #f4f4f4;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vue {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.blog-card-wrap {
  background: #fff;
  padding: 40px 20px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .title {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 24px;
    color: #333;
    text-align: center;
  }

  .blog-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
   
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 725px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        font-size: 40px;
      }
    }
  }
}
</style>

