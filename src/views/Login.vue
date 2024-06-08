<template>
  <div class='form-wrap'>
    <form @submit.prevent='signin' class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name:'Register' }">Register</router-link>
      </p>
      <h2>Login to BFR</h2>
      <div class="inputs">
        <div class="input">
          <input type="email" placeholder='Email' v-model='email' required />
          <email class='icon'/>
        </div>
        <div class="input">
          <input type="password" placeholder='Password' v-model='password' required />
          <password class='icon'/>
        </div>
        <div v-if='error' class="error">{{ errorMsg }}</div>
      </div>
      <router-link class='forgot-password' :to='{ name: "ForgotPassword" }'>Forgot your password?</router-link>
      <button type="submit" :disabled="signinLoading">
        <span v-if="!signinLoading">Sign in</span>
        <span v-else class="spinner"></span>
      </button>
      <div class="oauth">
        <button @click.prevent='googleSignIn' :disabled="googleLoading" class="google-button">
          <span v-if="!googleLoading">
            <google class="logo" />
          </span>
          <span v-else class="spinner"></span>
        </button>
        <button @click.prevent='microsoftSignIn' :disabled="microsoftLoading" class="microsoft-button">
          <span v-if="!microsoftLoading">
            <microsoft class="logomi" />
          </span>
          <span v-else class="spinner"></span>
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import firebase from 'firebase/app';
import google from '../assets/googlelogo.svg';
import microsoft from '../assets/microsoft.svg';
import email from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
import 'firebase/auth';

export default {
  name: "Login",
  components: { email, password, google, microsoft },
  data() {
    return {
      email: '',
      password: '',
      error: false,
      errorMsg: '',
      signinLoading: false,
      googleLoading: false,
      microsoftLoading: false,
    }
  },
  methods: {
    async signin() {
      this.signinLoading = true;
      this.error = false;
      this.errorMsg = '';
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        this.$router.push({ name: 'Home' });
      } catch (err) {
        this.error = true;
        this.errorMsg = err.message;
      } finally {
        this.signinLoading = false;
      }
    },
    async googleSignIn() {
      this.googleLoading = true;
      this.error = false;
      this.errorMsg = '';
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        this.$router.push({ name: 'Home' });
      } catch (err) {
        this.error = true;
        this.errorMsg = err.message;
      } finally {
        this.googleLoading = false;
      }
    },
     async microsoftSignIn() {
      this.microsoftLoading = true;
      this.error = false;
      this.errorMsg = '';
      try {
        const provider = new firebase.auth.OAuthProvider('microsoft.com');
        await firebase.auth().signInWithPopup(provider);
        this.$router.push({ name: 'Home' });
      } catch (err) {
        this.error = true;
        this.errorMsg = err.message;
      } finally {
        this.microsoftLoading = false;
      }
    }
  }
}
</script>



<style lang='scss'>
.form-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
}

form {
  background: #fff;
  padding: 40px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  .login-register {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
    text-align: center;

    .router-link {
      color: #3498db;
      text-decoration: none;
    }
  }

  .inputs {
    width: 100%;

    .input {
      position: relative;
      margin-bottom: 20px;

      input {
        width: 100%;
        padding: 10px 10px 10px 40px;
        border: 1px solid #ccc;
        border-radius: 20px;
        background-color: #f2f7f6;
        border-color: #3498db; /* Added border-color on focus */

        &:focus {
          border-color: #3498db;
        }
      }

      .icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
      }
    }
  }
  
  .error {
    color: red;
    font-size: 14px;
    margin-bottom: 20px;
    text-align: center;
  }

  .forgot-password {
    font-size: 14px;
    color: #3498db;
    margin-bottom: 20px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3498db;
    padding: 10px;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 14px;
    width: 100%;
    font-size: 1rem;

    &:hover {
      background-color: #2980b9;
    }

    &:disabled {
      background-color: #b0c4de;
      cursor: not-allowed;
    }

    .spinner {
      display: flex;
      width: 20px;
      height: 20px;
      border: 2px solid transparent; 
      border-top: 2px solid #fff; 
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }

  .oauth {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;

    .google-button, .microsoft-button {
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 20px;
      padding: 10px;
      width: 48%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        background-color: #f2f7f6;
      }

      &:disabled {
        background-color: #b0c4de;
        cursor: not-allowed;
      }

      .logo {
        width: 30px;
        height: 30px;
      }
      
      .logomi {
      width: 20px;
      height: 20px;}

      .spinner {
        width: 20px;
        height: 20px;
      }
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>



