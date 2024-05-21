<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'home' }">Biased Film Reviews</router-link>
          <ul class="social-links">
            <li><a href="#"><youTube class="svg-icon" /></a></li>
            <li><a href="#"><twitter class="svg-icon" /></a></li>
            <li><a href="#"><instagram class="svg-icon" /></a></li>
            <li><a href="#"><linkedin class="svg-icon" /></a></li>
          </ul>
        </div>
        <div class="col-2">
          <ul class="nav-links">
            <router-link class="link" :to="{ name: 'home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'reviews' }">Reviews</router-link>
            <router-link class="link" :to="{ name: 'home' }">News</router-link>
            <router-link class="link" :to="{ name: 'home' }">Blog</router-link>
          </ul>
        </div>
      </div>
      <div class="right">
        <p><span id="date">{{ this.addDate() }}</span> &#169; | All Rights Reserved</p>
        <p>Made with ❤️ by <a href="#">Kadima</a></p>
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
    linkedin
  },
  methods: {
    addDate() {
      const today = new Date();
      const year = today.getFullYear();
      return year;
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  padding: 40px 20px;
  background-color: #1a1a1a;
  color: #fff;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    @media (min-width: 800px) {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .col-1 {
      margin-bottom: 20px;
      @media (min-width: 800px) {
        margin-bottom: 0;
        margin-right: 40px;
      }
      .header {
        font-size: 1.5rem;
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        margin-bottom: 16px;
        &:hover {
          color: #f39c12;
        }
      }
      .social-links {
        display: flex;
        gap: 16px;
        list-style: none;
        li {
          .svg-icon {
            width: 24px;
            height: 24px;
            fill: #fff;
            transition: fill 0.3s;
            &:hover {
              fill: #f39c12;
            }
          }
        }
      }
    }
    .col-2 {
      .nav-links {
        display: flex;
        gap: 20px;
        list-style: none;
        flex-wrap: wrap;
        justify-content: center;
        @media (min-width: 800px) {
          justify-content: flex-start;
        }
        .link {
          font-size: 1rem;
          text-decoration: none;
          color: #fff;
          &:hover {
            color: #f39c12;
          }
        }
      }
    }
  }
  .right {
    margin-top: 20px;
    @media (min-width: 800px) {
      margin-top: 0;
    }
    p {
      margin: 0;
      color: #bbb;
      a {
        color: #f39c12;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>


