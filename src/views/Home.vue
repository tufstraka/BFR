<template>
  <div class="home">
    <BlogPost :post='welcomeScreen'/>
    <BlogPost :post='post' v-for="{post, index} in sampleBlogPost" :key="index" />
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue';

export default {
  name: "Home",
  components: { BlogPost },
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

