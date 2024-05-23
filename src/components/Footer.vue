<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__left">
        <router-link class="footer__logo" :to="{ name: 'home' }">Biased Film Review</router-link>
        <ul class="footer__social-links">
          <li>
            <a href="#"><youTube class="svg-icon" /></a>
          </li>
          <li>
            <a href="#"><twitter class="svg-icon" /></a>
          </li>
          <li>
            <a href="#"><instagram class="svg-icon" /></a>
          </li>
          <li>
            <a href="#"><linkedin class="svg-icon" /></a>
          </li>
        </ul>
      </div>
      <nav class="footer__nav">
        <ul>
          <li><router-link :to="{ name: 'reviews' }">Movies</router-link></li>
          <li><router-link :to="{ name: 'reviews' }">Books</router-link></li>
          <li><router-link :to="{ name: 'home' }">News</router-link></li>
          <li><router-link :to="{ name: 'home' }">Games</router-link></li>
          <li><router-link :to="{ name: 'reviews' }">TV Shows</router-link></li>
        </ul>
      </nav>
      <div class="footer__right">
        <p>&copy; {{ currentYear }} | All Rights Reserved</p>
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
  background-color: #303030;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
  padding: 40px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__logo {
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;

    &:hover {
      color: red;
      transition: color 0.2s ease;
    }
  }

  &__social-links {
    display: flex;
    gap: 16px;
    list-style: none;

    .svg-icon {
      width: 20px;
      height: auto;
      color: #fff;
    }
  }

  &__nav {
    ul {
      display: flex;
      gap: 20px;
      list-style: none;

      a {
        font-size: 16px;
        font-weight: 500;
        text-decoration: none;
        color: #fff;

        &:hover {
          color: red;
          transition: color 0.2s ease;
        }
      }
    }
  }

  &__right {
    p {
      color: #fff;
    }
  }
}
</style>
