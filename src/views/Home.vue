<template>
  <div class="home">
    <section class="hero" v-if="!user">
      <BlogPost :post="welcomeScreen" />
    </section>
    
    <div class="content-container">
      <TrendingMovies />
      
      <div class="blog-card-wrap container">
        <h1>Recent Reviews</h1>
        <div class="blog-cards">
          <BlogCards 
            v-for="(post, index) in blogPostsCards" 
            :post="post" 
            :key="index" 
            :data-aos="'fade-up'" 
            :data-aos-delay="index * 100"
          />
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
      }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: var(--background-light);
}

.hero {
  margin-bottom: 40px;
}

.content-container {
  padding: 24px 0 60px;
}

.blog-card-wrap {
  margin-top: 60px;
  
  h1 {
    text-align: center;
    margin-bottom: 32px;
    font-size: 28px;
    font-weight: 700;
    color: var(--text-dark);
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: var(--primary-color);
    }
  }
  
  .blog-cards {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr;
    
    @media(min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media(min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media(min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>