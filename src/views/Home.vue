<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    
    <div>
      <TrendingMovies />
      <!--<BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />-->
      
      <div class="blog-card-wrap">
        <h1 style="text-align:center;">Recent Reviews</h1>
        <div class="blog-cards">
          <BlogCards :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
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
  background: #d4dfc9;
}

.vue {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.blog-card-wrap {
  //background: linear-gradient(to bottom left, #625643, #eae3b8);
  
  h1 {
    font-weight: 800;
    font-size: 21px;
    margin-bottom: 12px;
    color: black;
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
