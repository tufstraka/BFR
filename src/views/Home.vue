<template>
  <div class="home">
    <!--<div>
    <ArticleGrid />
    </div>
    <BlogPost :post='welcomeScreen'/>-->
    <div>
        <TrendingMovies />
    </div>
    <BlogPost :post='post' v-for="(post, index) in sampleBlogPost" :key="index" />
    
    
    <div class="blog-card-wrap">
      
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
        class= 'vue'>      
      </vue-particles>
        
        <h1 text-align='center' >Recent Reviews</h1>
        
        <div class = 'blog-cards'>
          
          <BlogCards :post='post' v-for="(post, index) in sampleBlogCards" :key="index" />
        </div>
      </div>
    </div>
    <div class="updates">
      <div class="container">
        <h2>Never miss a post. Trust Me, you wouldn't want to. Register for your free account today !</h2>
        <router-link class='router-button' to='#'>Register for BFR  <Arrow class='arrow arrow-light'/> </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import Arrow from "../assets/Icons/arrow-right-light.svg";
import BlogPost from '../components/BlogPost.vue';
import BlogCards from '../components/BlogCard.vue';
import TrendingMovies from '../components/TrendingMovies.vue';
import ArticleGrid from '../components/ArticleGrid.vue';

export default {
  name: "Home",
  components: { BlogPost , BlogCards , Arrow , TrendingMovies, ArticleGrid },
  data(){
    return {
      welcomeScreen:{
        title:"welcome",
        blogPost:"Weekly biased film reviews from anonymous professional official(unofficial) critiques",
        welcomeScreen: true,
        photo:"gal"
      },
      sampleBlogPost:[
        {
        title:"lorem ipsum",
        blogHTML:"This is a filler blog post",
        blogCoverPhoto:"beautiful-stories",
        },
        {
        title:"lorem ipsum",
        blogHTML:"This is a filler blog post",
        blogCoverPhoto:"designed-for everyone",
        },
      ],      
 
    };
  },
  computed: {
    sampleBlogCards(){
      return this.$store.state.sampleBlogCards
    }
  },
  
};   
  
</script>

<style lang='scss' scoped>
.vue{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
}

.blog-card-wrap{
  background-color: #303030;
  h1{
    font-weight: 300;
    font-size: 21px;
    margin-bottom: 12px;
    color: white;
    
  }
}
.updates{
  .container{
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
   
    @media(min-width: 800px){
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button{
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media(min-width: 800px){
        margin-left: auto
      }
    }
    h2{
      font-weight: 300;
      font-size: 32px;
      max-width: 725px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media(min-width: 800px){
        //text-align: initial;
        font-size: 40px;
      }
    }
  }
}

</style>
