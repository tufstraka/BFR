<template>
  <div class='form-wrap'>
    <form action=" " class="login">
      <p class="login-register">
        Don't have an account? 
        <router-link class="router-link" :to="{ name:'Register'} ">Register</router-link>
      </p>
      <h2>Login to BFR</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder='Email' v-model='email' />
          <email class='icon'/>
        </div>
        <div class="input">
          <input type="text" placeholder='Password' v-model='password'>
          <password class='icon'/>          
        </div>
        <div v-show='error' class="error">{{this.errorMsg}}</div>
      </div>
      <router-link class='forgot-password' :to='{name: "ForgotPassword"}'>Forgot your password?</router-link>
      <button @click.prevent='signin'>Sign in</button>      
    </form>    
  </div>
      
  
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import email from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
export default {
  name: "Login",
  components: { email , password},
  data(){
    return{
      email: '',
      password: '',
      error: null,
      errorMsg: ''
    }
  },
  methods: {
    signin(){
      firebase.auth().signInWithEmailAndPassword(this.email , this.password)
      .then(() =>{
        this.$router.push({name:'Home'});
        this.error = false;
        this.errorMsg = '';
        
      })
      .catch( (err) =>{
        this.error = true;
        this.errorMsg = err.message;
      })
      
    }
  } 
}
</script>

<style lang='scss'>
.form-wrap{
  overflow: hidden;
  display:flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media(min-width: 900px){
    width: 100%;
  }
}
.login-register{
  margin-bottom: 32px;
  
  .router-link{
    color: #000;
  }
}
form{
  padding: 0 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  @media(min-width: 900px){
    padding: 0 50px;
  }
  h2{
    text-align: center;
    font-size: 32px;
    color:#303030;
    margin-bottom: 40px;
    @media(min-width: 900px){
    font-size:40px;
  }
  }
  .inputs{
    width: 100%;
    max-width: 350px;
    .input{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;
      input{
        width: 100%;
        border: none;
        background-color: #f2f7f6;
        padding: 4px 4px 4px 30px;
        height: 50px;
        border-radius: 38px;
        &:focus{
          outline: none;
        }  
      }
      .icon{
        width: 12px;
        position: absolute;
        left: 6px;
      }
    }
  }
  .forgot-password{
    text-decoration: none;
    color: #000;
    cursor: pointer;
    font-size: 16px;
    margin: 16px 0 32px;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease all;

    &:hover {
      border-color: #303030;
    }
  }
}
</style>
