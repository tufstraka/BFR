<template>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-main">
        <div class="footer-branding">
          <router-link :to="{ name: 'Home' }" class="footer-logo">
            <img src="@/assets/BiasedFilmReviewLogo.png" alt="BFR Logo" class="logo" />
            <span>Biased Film Review</span>
          </router-link>
          <p class="footer-tagline">Your source for honest opinions on entertainment</p>
        </div>
        
        <div class="footer-nav-wrap">
          <nav class="footer-nav">
            <h4>Explore</h4>
            <ul>
              <li><router-link :to="{ name: 'Blogs' }">Movies</router-link></li>
              <li><router-link :to="{ name: 'Blogs' }">TV Shows</router-link></li>
              <li><router-link :to="{ name: 'News' }">News</router-link></li>
            </ul>
          </nav>
          
          <nav class="footer-nav">
            <h4>More</h4>
            <ul>
              <li><router-link to="#">Books</router-link></li>
              <li><router-link to="#">Games</router-link></li>
              <li><router-link :to="{ name: 'CreatePost' }">Write a Review</router-link></li>
            </ul>
          </nav>
          
          <div class="footer-social">
            <h4>Follow Us</h4>
            <div class="social-links">
              <a href="#" aria-label="YouTube"><youTube /></a>
              <a href="#" aria-label="Twitter"><twitter /></a>
              <a href="#" aria-label="Instagram"><instagram /></a>
              <a href="#" aria-label="LinkedIn"><linkedin /></a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Biased Film Review | All Rights Reserved</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import youTube from '../assets/Icons/youtube-brands.svg';
import twitter from '../assets/Icons/twitter-brands.svg';
import instagram from '../assets/Icons/instagram-brands.svg';
import linkedin from '../assets/Icons/linkedin-brands.svg';

export default {
  name: 'footer-vue',
  components: {
    youTube,
    twitter,
    instagram,
    linkedin,
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: #212428;
  padding: 60px 0 30px;
  color: #fff;
  margin-top: auto;
}

.footer-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.footer-main {
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.footer-branding {
  flex-basis: 320px;
  
  .footer-logo {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    margin-bottom: 16px;
    
    img {
      width: 40px;
      height: auto;
      margin-right: 12px;
    }
    
    span {
      font-weight: 700;
      font-size: 18px;
    }
  }
  
  .footer-tagline {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
}

.footer-nav-wrap {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  gap: 40px;
  
  @media (min-width: 768px) {
    justify-content: flex-end;
  }
}

.footer-nav {
  min-width: 120px;
  
  h4 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 30px;
      height: 2px;
      background-color: var(--primary-color);
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 12px;
      
      a {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        font-size: 15px;
        transition: color var(--transition-fast);
        
        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
}

.footer-social {
  h4 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 30px;
      height: 2px;
      background-color: var(--primary-color);
    }
  }
  
  .social-links {
    display: flex;
    gap: 16px;
    
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      transition: var(--transition-fast);
      
      svg {
        width: 18px;
        height: 18px;
        
        path {
          fill: white;
        }
      }
      
      &:hover {
        background-color: var(--primary-color);
        transform: translateY(-3px);
      }
    }
  }
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    
    a {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: color var(--transition-fast);
      
      &:hover {
        color: var(--primary-color);
      }
    }
  }
}
</style>