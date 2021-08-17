<template>
   <div class='form-wrap'>
    <form action=" " class="register">
      <p class="login-register">
        Already have an account? 
        <router-link class="router-link" :to="{ name:'Login'} ">Login</router-link>
      </p>
      <h2>Create your BFR Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder='First Name' v-model='firstName'>
          <user class='icon'/>
        </div>
        <div class="input">
          <input type="text" placeholder='Last Name' v-model='lastName'>
          <user class='icon'/>
        </div>
        <div class="input">
          <input type="text" placeholder='Username' v-model='userName'>
          <user class='icon'/>
        </div>
        <div class="input">
          <input type="email" placeholder='E-mail' v-model='email'>
          <email class='icon'/>
        </div>
        <div class="input">
          <input type="text" placeholder='Password' v-model='password'>
          <password class='icon'/>
        </div>
        <div v-if='error' class="error">{{this.errorMsg}}</div>
      </div>
     
      <button @click.prevent='register'>Sign Up</button>
      
    </form>
  </div>
</template>

<script>
import email from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
import user from '../assets/Icons/user-alt-light.svg';
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase/firebaseInit'
export default {
  name:'Register',
  components: { email , password , user },
  data(){
    return{
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      error: "",
      errorMsg: "",
    };
  },
  methods:{
    async register(){
      if(
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.userName !== '' &&
        this.email !== '' &&
        this.password !== ''
      ) {
        this.error = false;
        this.errorMsg = '';
        const firebaseAuth = await firebase.auth()
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email , this.password);
        const result = await createUser;
        const database = db.collection('users').doc(result.user.uid);
        await database.set({
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email : this.email,
          password: this.password
        })
        this.$router.push({name: "Home"})
        return;
      }
      this.error = true;
      this.errorMsg = 'Please fill out all the fields';
      return;
    },
  }
}
</script>

<style lang='scss' scoped>
h2{
  max-width: 350px;
}

</style>