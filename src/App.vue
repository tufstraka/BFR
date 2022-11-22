<template>
  <div class="app-wrapper">
    <div class="app" >
      <Navigation v-if='!navigation'/>
      <router-view />
      <Footer v-if='!navigation'/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import Navigation from './components/Navigation.vue';
import Footer from "./components/Footer.vue";

export default {

  name: "app",
  components: {Navigation , Footer},
  
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
  
mounted() {},
  
methods: {
    checkRoute(){
      if (
        this.$route.name === "Login" || 
        this.$route.name === "Register" || 
        this.$route.name === "ForgotPassword"
     ) {
        this.navigation = true;
        return;
       } else
      {
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
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}


body::-webkit-scrollbar{
    width: 1.26rem;
}
body::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

body::-webkit-scrollbar-track {
    background-color: transparent;
  }
  
body::-webkit-scrollbar-thumb:hover {
    background-color: rgb(233, 48, 48);
  }  

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}
.arrow{
  margin-left: 8px;
  width: 12px;
  path{
    fill: #000;
  }
}
.arrow-light{
  path{
    fill: #fff;
  }
}

.blog-card-wrap{
  position: relative;  
  padding: 80px 16px;
  
  @media(min-width: 500px){
    padding: 100px 16px;
  }
  .blog-cards{
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
  z-index: 99999;

  @media(min-width: 500px){
    grid-template-columns: repeat(2 , 1fr) 
  }
  @media(min-width: 900px){
    grid-template-columns: repeat(3 , 1fr) 
  }
  @media(min-width: 1200px){
    grid-template-columns: repeat(4 , 1fr) 
  }
}

}

button,
.router-button{
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 16px;
  margin-left: 25px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
  &:focus{
    outline:none;
  }
  &:hover{
    background-color: rgba(48, 48, 48, 0.7)
  }
}
.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}
.button-inactive{
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128,128,0.5)
}
.button-ghost{
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media(min-width: 700px){
    margin-top: 0;
    margin-left: auto;
  } 
}
.error{
  text-align: center;
  font-size: 12px;
  color: red;
}


</style>
