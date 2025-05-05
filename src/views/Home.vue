<template>
  <div class="hero-wrapper" :class="{'guest-view': !user}">
    <div class="hero-content">
      <div class="content-container">
        <h1 v-if="post.welcomeScreen">
          {{ post.title }} <span class="wave-emoji">👋</span>
        </h1>
        <h1 v-else>{{ post.blogTitle }}</h1>
        
        <p v-if="post.welcomeScreen" class="hero-description">
          {{ post.blogPost }}
        </p>
        <div v-else class="blog-preview" v-html="post.blogHTML"></div>
        
        <router-link 
          v-if="post.welcomeScreen" 
          class="cta-button primary" 
          :to="{name: 'Register'}"
        >
          Get Started
          <svg class="arrow-icon" viewBox="0 0 24 24">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
          </svg>
        </router-link>
        
        <router-link 
          v-if="user" 
          class="cta-button secondary" 
          :to="{name: 'ViewBlog', params: {blogid: post.blogID}}"
        >
          View the Post
          <svg class="arrow-icon" viewBox="0 0 24 24">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
          </svg>
        </router-link>
      </div>
    </div>
    
    <div class="hero-media">
      <div v-if="post.welcomeScreen" class="illustration-container">
        <HomeSvg class="hero-illustration" />
      </div>
      <div v-else class="image-container">
        <img :src="post.blogCoverPhoto" alt="Cover image" />
      </div>
    </div>
  </div>
</template>

<script>
// Import SVG as component
import HomeSvg from './HomeSvg.vue';

export default {
  name: "HeroSection",
  props: ["post"],
  components: { HomeSvg },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
}
</script>

<style lang="scss" scoped>
// Color variables
:root {
  --primary: #6c5ce7;
  --primary-dark: #5649c0;
  --primary-light: #a29bfe;
  --secondary: #fd79a8;
  --text-dark: #2d3436;
  --text-medium: #636e72;
  --text-light: #b2bec3;
  --background: #ffffff;
  --background-alt: #f8f9fa;
  --shadow: 0 10px 30px rgba(0,0,0,0.1);
  --radius: 12px;
  --transition: all 0.3s ease;
}

.hero-wrapper {
  display: flex;
  flex-direction: column-reverse;
  border-radius: var(--radius);
  overflow: hidden;
  background-color: var(--background);
  box-shadow: var(--shadow);
  margin: 24px 16px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    height: 580px;
    margin: 40px;
  }
  
  &.guest-view {
    .hero-content {
      background: linear-gradient(135deg, #8C5CFF, #6C5CE7);
      
      h1, p {
        color: white;
      }
      
      .cta-button.primary {
        background-color: white;
        color: var(--primary);
        box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        
        &:hover {
          background-color: #f8f9fa;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.2);
        }
        
        .arrow-icon {
          fill: var(--primary);
        }
      }
    }
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 24px;
  flex: 1;
  
  @media (min-width: 768px) {
    padding: 60px;
    flex: 5;
  }
  
  @media (min-width: 1200px) {
    flex: 4;
  }
  
  .content-container {
    max-width: 540px;
    margin: 0 auto;
    
    @media (min-width: 768px) {
      margin: 0;
    }
  }
  
  h1 {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 24px;
    color: var(--text-dark);
    line-height: 1.2;
    
    @media (min-width: 768px) {
      font-size: 44px;
    }
    
    .wave-emoji {
      display: inline-block;
      animation: wave 2.5s infinite;
      transform-origin: 70% 70%;
    }
  }
  
  .hero-description {
    font-size: 18px;
    line-height: 1.7;
    color: var(--text-medium);
    margin-bottom: 32px;
    
    @media (min-width: 768px) {
      font-size: 20px;
    }
  }
  
  .blog-preview {
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-medium);
    margin-bottom: 32px;
    max-height: 120px;
    overflow: hidden;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1));
    }
  }
  
  .cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 32px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: var(--transition);
    cursor: pointer;
    
    .arrow-icon {
      width: 20px;
      height: 20px;
      margin-left: 8px;
      transition: transform 0.2s ease;
    }
    
    &:hover .arrow-icon {
      transform: translateX(4px);
    }
    
    &.primary {
      background-color: var(--primary);
      color: white;
      
      &:hover {
        background-color: var(--primary-dark);
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3);
      }
      
      .arrow-icon {
        fill: white;
      }
    }
    
    &.secondary {
      background-color: transparent;
      color: var(--primary);
      border: 2px solid var(--primary);
      
      &:hover {
        background-color: rgba(108, 92, 231, 0.08);
        transform: translateY(-3px);
      }
      
      .arrow-icon {
        fill: var(--primary);
      }
    }
  }
}

.hero-media {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-alt);
  min-height: 280px;
  overflow: hidden;
  
  @media (min-width: 768px) {
    flex: 4;
    min-height: auto;
  }
  
  @media (min-width: 1200px) {
    flex: 5;
  }
  
  .illustration-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .hero-illustration {
      width: 90%;
      height: auto;
      max-height: 90%;
      transition: transform 0.5s ease;
      
      &:hover {
        transform: scale(1.03);
      }
    }
  }
  
  .image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
      
      &:hover {
        transform: scale(1.05);
      }
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