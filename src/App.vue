<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-if='!navigation'/>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <Footer v-if='!navigation'/>
    </div>
  </div>
</template>

<script>
import dotenv from 'dotenv'
import firebase from 'firebase/app';
import 'firebase/auth';
import Navigation from './components/Navigation.vue';
import Footer from "./components/Footer.vue";

dotenv.config()

export default {
  name: "app",
  components: {Navigation, Footer},
  
  data() {
    return {
      navigation: null,
    };
  },
  
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if(user) {
        this.$store.dispatch("getCurrentUser", user);
      }
    })
    this.checkRoute();
    this.$store.dispatch("getPost")
  },
  
  methods: {
    checkRoute(){
      if (
        this.$route.name === "Login" || 
        this.$route.name === "Register" || 
        this.$route.name === "ForgotPassword"
      ) {
        this.navigation = true;
        return;
      } else {
        this.navigation = false;
      }
    },
  },
  
  watch: {
    $route(){
      this.checkRoute();
    }
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #2a41e8;
  --primary-light: #e9efff;
  --secondary-color: #e74c3c;
  --text-dark: #303030;
  --text-light: #696969;
  --background-light: #f5f7fa;
  --background-primary: #ffffff;
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

body {
  background-color: var(--background-light);
  color: var(--text-dark);
  font-size: 16px;
  line-height: 1.6;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.link {
  cursor: pointer;
  text-decoration: none;
  color: var(--primary-color);
  font-weight: 500;
  transition: var(--transition-fast);
  
  &:hover {
    color: var(--secondary-color);
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.arrow {
  margin-left: 8px;
  width: 12px;
  transition: var(--transition-fast);
  
  path {
    fill: var(--primary-color);
  }
}

.blog-card-wrap {
  position: relative;  
  padding: 40px 16px;
  
  h1 {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 24px;
    color: var(--text-dark);
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background-color: var(--primary-color);
    }
  }
  
  .blog-cards {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr;
    
    @media(min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media(min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media(min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

button,
.router-button {
  transition: var(--transition-fast);
  cursor: pointer;
  margin-top: 16px;
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(42, 65, 232, 0.3);
  }
  
  &:hover {
    background-color: darken(#2a41e8, 10%);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.button-ghost {
  background-color: transparent;
  color: var(--primary-color);
  padding: 10px 16px;
  
  &:hover {
    background-color: var(--primary-light);
  }
}

.button-inactive {
  pointer-events: none !important;
  cursor: default !important;
  background-color: rgba(128, 128, 128, 0.5);
}

.error {
  text-align: center;
  font-size: 14px;
  color: var(--secondary-color);
  margin-top: 8px;
}
</style>