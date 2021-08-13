<template>
  <div class="home">
    <BlogPost :post='welcomeScreen'/>
    <BlogPost :post='post' v-for="(post, index) in sampleBlogPost" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h1 text-align='center' >View More Recent Reviews</h1>
        <div class = 'blog-cards'>
          <BlogCards :post='post' v-for="(post, index) in sampleBlogCards" :key="index" />
        </div>
      </div>
    </div>
    <div class="updates">
      <div class="container">
        <h2>Never miss a post. Trust Me, you wouldn't want to. Register for your free account today</h2>
        <router-link class='router-button' to='#'>Register for BFR  <Arrow class='arrow arrow-light'/> </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg"
import BlogPost from '../components/BlogPost.vue';
import BlogCards from '../components/BlogCard.vue';

export default {
  name: "Home",
  components: { BlogPost , BlogCards , Arrow },
  data(){
    return {
      welcomeScreen:{
        title:"welcome",
        blogPost:"Weekly biased film reviews from anonymous professional official(unofficial) critiques",
        welcomeScreen: true,
        photo:"reel"
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
      sampleBlogCards:[
        {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-1' , blogDate:'May 23, 2021'},
        {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-2' , blogDate:'May 23, 2021'},
        {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-3' , blogDate:'May 23, 2021'},
        {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-4' , blogDate:'May 23, 2021'},
      ]
    };
  },
};   
  
</script>

<style lang='scss' scoped>

.blog-card-wrap{
  h1{
    font-weight: 300;
    font-size: 21px;
    margin-bottom: 32px;
    
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
