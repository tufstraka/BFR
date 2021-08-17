<template>
  <div class='reset-password'>
    <Modal v-if='modalActive' :modalMessage='modalMessage' v-on:close-modal='closeModal' />
    <Loading v-if='modalActive'/>
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to 
          <router-link class="router-link" :to="{ name:'Login'} ">Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your Email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="E-mail" v-model="email" />
            <email class="icon"/>
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
      </form>
    </div>
  </div>
</template>

<script>
import Loading  from '../components/Loading.vue';
import email from '../assets/Icons/envelope-regular.svg';
import Modal from '../components/Modal';
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
  name:'ForgotPassword',
  components:{email , Modal, Loading},
  data(){
    return{
      email: "",
      modalActive: null,
      modalMessage:"",
      loading: null,
    };
  },
  methods:{
    resetPassword(){
      this.loading = true;
      firebase.auth().sendPasswordResetEmail(this.email)
      .then(() =>{
        this.loading = false;
        this.modalActive = true;
        this.modalMessage = "if your account exists, you will receive an email";       
        
      })
      .catch( (err) => {
        this.modalMesage = err.message;
        this.loading = false;
        this.modalActive = true;
      });
    },
    closeModal(){
      this.modalActive = !this.modalActive;
      this.email = '';
    }
  }

}
</script>

<style lang='scss' scoped>
.reset-password{
  position: relative;
  .form-wrap{
    .reset{
      h2{
        margin-bottom: 8px;
      }
      p{
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}

</style>