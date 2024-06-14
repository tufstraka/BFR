<!--<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />

    <div class="content">
      <TrendingMovies />

      <div class="featured-reviews">
        <h1>Editor's Picks</h1>
        <div class="featured-cards">
          <FeaturedCard
            :post="post"
            v-for="(post, index) in featuredPosts"
            :key="index"
          />
        </div>
      </div>

      <div class="recent-reviews">
        <h1>Recent Reviews</h1>
        <div class="blog-cards">
          <BlogCards
            :post="post"
            v-for="(post, index) in blogPostsCards"
            :key="index"
          />
        </div>
      </div>

      <div class="top-reviewers">
        <h1>Top Reviewers</h1>
        <div class="reviewer-cards">
          <ReviewerCard
            :reviewer="reviewer"
            v-for="(reviewer, index) in topReviewers"
            :key="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue";
import BlogCards from "../components/BlogCard.vue";
import TrendingMovies from "../components/TrendingMovies.vue";
import FeaturedCard from "../components/FeaturedCard.vue";
import ReviewerCard from "../components/ReviewerCard.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    BlogPost,
    BlogCards,
    TrendingMovies,
    FeaturedCard,
    ReviewerCard,
  },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome to Biased Film Review",
        blogPost:
          "Love movies? Want to share your thoughts? Join our community of movie enthusiasts. Discover trending movies, read reviews, and write your own!",
        welcomeScreen: true,
        photo: "movie1",
      },
      featuredPosts: [], 
      topReviewers: [], 
    };
  },
  computed: {
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },
    user() {
      return this.$store.state.user;
    },
  },
  async created() {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: process.env.VUE_APP_TMDB_API_KEY,
            language: "en-US",
            page: 1,
          },
        }
      );
      this.featuredPosts = response.data.results.slice(0, 4); 
    } catch (error) {
      console.error("Error fetching Editor's Picks:", error);
    }

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/person/popular",
        {
          params: {
            api_key: process.env.VUE_APP_TMDB_API_KEY, 
            language: "en-US",
            page: 1,
          },
        }
      );
      this.topReviewers = response.data.results.slice(0, 4); // Adjust as per your application's needs
    } catch (error) {
      console.error("Error fetching Top Reviewers:", error);
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: #f9f9f9;
  padding: 20px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .featured-reviews,
  .recent-reviews,
  .top-reviewers {
    width: 100%;
    max-width: 1200px;
    margin-top: 20px;

    h1 {
      font-weight: bold;
      font-size: 28px;
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }

    .featured-cards,
    .blog-cards,
    .reviewer-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

      gap: 20px;
    }
  }
}
</style>-->

<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />

    <div>
      <TrendingMovies />
      <!--<BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />-->

      <div class="blog-card-wrap">
        <h1 style="text-align: center">Recent Reviews</h1>
        <div class="blog-cards">
          <BlogCards
            :post="post"
            v-for="(post, index) in blogPostsCards"
            :key="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue";
import BlogCards from "../components/BlogCard.vue";
import TrendingMovies from "../components/TrendingMovies.vue";

export default {
  name: "Home",
  components: { BlogPost, BlogCards, TrendingMovies },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome to Biased Film Review",
        blogPost:
          "Passionate about movies, games, TV shows, and books? Dive into our community of enthusiasts. Explore the latest trends, indulge in insightful reviews, and share your own opinions!",
        welcomeScreen: true,
        photo: "movie1",
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

<style lang="scss" scoped>
.home {
  background: #f9f9f9;
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
