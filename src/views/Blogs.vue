<template>
  <div class='blog-card-wrap'>
      <div class="blog-cards container">
          <div v-if="admin" class="toggle-edit">
              <span>Toggle Editing Post</span> <br>
              <input type="checkbox" v-model='editPost'>
              
          </div>
          <BlogCards :post='post' v-for="(post, index) in blogPosts" :key="index" />
      </div>
  </div>
</template>

<script>
import BlogCards from '../components/BlogCard.vue';
export default {
    name:'Blogs',
    components: {BlogCards},
    computed: {
 
    admin() {
            return this.$store.state.profileAdmin;
        },
    
    blogPosts(){
      return this.$store.state.blogPosts;
    },
    
    editPost:{
        get(){
            return this.$store.state.editPost
        },
        set(payload){
            this.$store.commit('toggleEditPost' , payload)
        },
    },
  },
  beforeDestroy(){
      this.$store.commit("toggleEditPost" , false)
  } 

}
</script>

<style lang='scss' scoped>

.blog-cards{
    position: relative;
    .toggle-edit{
        display: flex;
        align-items: center;
        position: absolute;
        top: -70px;
        right:0;

        span{
            margin-right: 16px;
        }

 
    }
}

input[type="checkbox"]{
    position: relative;
    border: none;
    background: #fff;
    outline: none;
    width: 80px;
    height: 24px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.6);
}

input[type="checkbox"]:before{
    content:'';
    position: absolute;
    background: #fff;
    outline: none;
    width: 30px;
    height: 16px;
    border-radius: 20px;
    top:3px;
    left: 3px;
    transform: scale(1.1);
    transition: 750ms ease all;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.6);
}

input:checked[type="checkbox"]:before{
    background: #fff;
    left: 47px;
    background-color:red;
}


</style>
