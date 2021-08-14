<template>
  <div class='reset-password'>
    <Modal v-if='modalActive' v-on:close-modal='closeModal' />
    <div class="form-wrap">
      <form action=" " class="reset">
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your Email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="E-mail" v-model="email" />
            <email class="icon"/>
          </div>
        </div>
        <button>Reset</button>
      </form>
    </div>
  </div>
</template>

<script>
import email from '../assets/Icons/envelope-regular.svg';
import Modal from '../components/Modal';
export default {
  name:'ForgotPassword',
  components:{email , Modal},
  data(){
    return{
      email: null,
      modalActive: null,
      modalMessage:"",
    };
  },
  methods:{
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