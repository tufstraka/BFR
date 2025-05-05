<template>
    <div class="blog-wrapper" :class="{'no-user': !user}">
      <div class="blog-content">
        <div class="content-inner">
          <h2 v-if="post.welcomeScreen">{{ post.title }} <span class="wave">👋</span></h2>
          <h2 v-else>{{ post.blogTitle }}</h2>
          
          <p v-if='post.welcomeScreen' class="welcome-text">{{ post.blogPost }}</p>
          <p v-else class='content-preview' v-html="post.blogHTML"></p>
          
          <router-link class='btn-primary' v-if='post.welcomeScreen' :to="{name: 'Register'}">
            Get Started <Arrow class='arrow'/>
          </router-link>
          <router-link v-if="user" class='btn-primary' :to="{name: 'ViewBlog', params: {blogid: this.post.blogID}}">
            View the Post <Arrow class='arrow'/>
          </router-link>
        </div>
      </div>
      
      <div class="blog-photo">
        <HomeSvg v-if='post.welcomeScreen' class="welcome-svg" />
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
  .blog-wrapper {
    display: flex;
    flex-direction: column;
    background-color: var(--background-primary);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    margin: 0 16px;
    
    @media(min-width: 768px) {
      min-height: 550px;
      flex-direction: row;
      margin: 0 40px;
    }
    
    &.no-user {
      .blog-content {
        background: linear-gradient(135deg, #3a67e0, #2a41e8);
        color: white;
        
        h2, p {
          color: white;
        }
        
        .btn-primary {
          background-color: white;
          color: var(--primary-color);
          
          &:hover {
            background-color: rgba(255,255,255,0.9);
          }
          
          .arrow path {
            fill: var(--primary-color);
          }
        }
      }
    }
    
    .blog-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 4;
      order: 2;
      padding: 40px 20px;
      
      @media(min-width: 768px) {
        order: 1;
        padding: 60px 40px;
      }
      
      @media(min-width: 992px) {
        flex: 3;
      }
      
      .content-inner {
        max-width: 450px;
        
        h2 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--text-dark);
          line-height: 1.2;
          
          @media(min-width: 768px) {
            font-size: 40px;
          }
          
          .wave {
            display: inline-block;
            animation: wave 2.5s infinite;
            transform-origin: 70% 70%;
          }
        }
        
        p {
          font-size: 17px;
          line-height: 1.7;
          color: var(--text-light);
          margin-bottom: 32px;
        }
        
        .welcome-text {
          font-size: 18px;
        }
        
        .content-preview {
          font-size: 15px;
          max-height: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        
        .btn-primary {
          display: inline-flex;
          align-items: center;
          background-color: var(--primary-color);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition-normal);
          
          &:hover {
            transform: translateY(-3px);
            background-color: darken(#2a41e8, 10%);
          }
          
          .arrow {
            margin-left: 8px;
            width: 16px;
            transition: transform 0.2s ease;
            
            path {
              fill: white;
            }
          }
          
          &:hover .arrow {
            transform: translateX(3px);
          }
        }
      }
    }
    
    .blog-photo {
      order: 1;
      flex: 3;
      overflow: hidden;
      max-height: 300px;
      
      @media(min-width: 768px) {
        order: 2;
        max-height: none;
      }
      
      img, .welcome-svg {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition-normal);
      }
      
      img:hover {
        transform: scale(1.05);
      }
    }
  }
  
  @keyframes wave {
    0% { transform: rotate(0deg); }
    10% { transform: rotate(14deg); }
    20% { transform: rotate(-8deg); }
    30% { transform: rotate(14deg); }
    40% { transform: rotate(-4deg); }
    50% { transform: rotate(10deg); }
    60% { transform: rotate(0deg); }
    100% { transform: rotate(0deg); }
  }
  </style>