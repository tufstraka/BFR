<template>
  <div class ='blog-wrapper' :class="{'no-user' : !user}">
      <div class="blog-content">
          <div>
              <h2 v-if="post.welcomeScreen"> {{post.title}} &#128075;</h2>
              <h2 v-else>{{post.blogTitle}}</h2>
              <p v-if='post.welcomeScreen'>{{post.blogPost}} </p>
              <p v-else class='content-preview' v-html="post.blogHTML"></p>
              <router-link class='link' v-if='post.welcomeScreen' :to="{name: 'Register'}">
                Get Started <Arrow class='arrow'/>
              </router-link>
              <router-link v-if="user" class='link' :to="{name: 'ViewBlog', params: {blogid: this.post.blogID}}">
                View the Post <Arrow class='arrow'/>
              </router-link>
            </div>
         
      </div>
       <div class="blog-photo">
            <HomeSvg v-if='post.welcomeScreen' />
            <img v-else :src="post.blogCoverPhoto" alt="blog photo" />
        </div>
  </div>
</template>

<script>
import Arrow from '../assets/Icons/arrow-right-light.svg'
import HomeSvg from './HomeSvg.vue';

export default {
    name: "blogPost",
    props:["post"],
    components:{ Arrow, HomeSvg },
    computed: {
        user() {
            return this.$store.state.user;
        }
    }

}
</script>

<style lang='scss' scoped>

.blog-wrapper{
    display:flex;
    flex-direction: column;
    /*box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.6) ;*/
    @media(min-width: 700px){
        min-height: 650px;
        max-height: 650px;
        flex-direction: row;
    }
    .blog-content{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media(min-width: 700px){
        order:1;
    }
    @media(min-width: 800px){
        flex: 3;
    }

    div{
        max-width:375px;
        padding: 30px 24px;
        @media(min-width: 700px){
            font-size: 40px;
        }
        h2{
            font-size:32px;
            font-weight: 300;
            text-transform: uppercase;
            margin-bottom: 24px;
            @media(min-width: 700px){
            font-size: 40px
            }
        }
        p{
            font-size: 17px;
            font-weight: 300;
            line-height: 1.5;
        }

        .content-preview{
            font-size: 13px;
            max-height: 24px;
            width: 250px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .link{
            display: inline-flex;
            align-items: center;
            margin-top: 32px;
            padding-bottom:4px;
            border-bottom: 1px solid transparent;
            transition: .5s ease-in all;
            font-size: large;
            font-weight: bold;
            &:hover{
                border-bottom-color: #303030;
            } 
        }
        .link-light{
            &:hover{
                border-bottom-color: #ffff;
            }
        }
    }
}
    .blog-photo{
        order: 1;
        flex: 3;
        
        img{
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &:nth-child(even){
        .blog-content{
            order: 2;
        }
        .blog-photo{
            order: 1;
        }
    }
}

</style>
