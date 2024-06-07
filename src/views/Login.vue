<template>
  <div class='form-wrap'>
    <form action=" " class="login">
      <p class="login-register">
        Don't have an account? 
        <router-link class="router-link" :to="{ name:'Register'}">Register</router-link>
      </p>
      <h2>Login to BFR</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder='Email' v-model='email' />
          <email class='icon'/>
        </div>
        <div class="input">
          <input type="password" placeholder='Password' v-model='password' />
          <password class='icon'/>          
        </div>
        <div v-show='error' class="error">{{ this.errorMsg }}</div>
      </div>
      <router-link class='forgot-password' :to='{ name: "ForgotPassword" }'>Forgot your password?</router-link>
      <button @click.prevent='signin' :disabled="loading">
        <span v-if="!loading">Sign in</span>
        <span v-else class="spinner"></span>
      </button>
      <button @click.prevent='googleSignIn' :disabled="loading" class="google-button">
        <span v-if="!loading">Sign in with Google</span>
        <span v-else class="spinner"></span>
      </button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import email from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
import 'firebase/auth';

export default {
  name: "Login",
  components: { email, password },
  data() {
    return {
      email: '',
      password: '',
      error: false,
      errorMsg: '',
      loading: false,
    }
  },
  methods: {
    async signin() {
      this.loading = true;
      this.error = false;
      this.errorMsg = '';
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        this.$router.push({ name: 'Home' });
      } catch (err) {
        this.error = true;
        this.errorMsg = err.message;
      } finally {
        this.loading = false;
      }
    },
    async googleSignIn() {
      this.loading = true;
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
        this.loading = false;
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
  height: 100vh;
  width: 100%;
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

        &:focus {
          outline: none;
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
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 14px;
    padding: 10px 20px;
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
      width: 20px;
      height: 20px;
      border: 2px solid #fff;
      border-top: 2px solid transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }

  .google-button {
    background-color: #db4437;

    &:hover {
      background-color: #c33d2e;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>


