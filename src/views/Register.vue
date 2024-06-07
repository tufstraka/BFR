<template>
  <div class='form-wrap'>
    <form action=" " class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h2>Create your BFR Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder='First Name' v-model='firstName'>
          <user class='icon' />
        </div>
        <div class="input">
          <input type="text" placeholder='Last Name' v-model='lastName'>
          <user class='icon' />
        </div>
        <div class="input">
          <input type="text" placeholder='Username' v-model='userName'>
          <user class='icon' />
        </div>
        <div class="input">
          <input type="email" placeholder='E-mail' v-model='email'>
          <email class='icon' />
        </div>
        <div class="input">
          <input type="password" placeholder='Password' v-model='password'>
          <password class='icon' />
        </div>
        <div v-if='error' class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent='register' :disabled="loading">
        <span v-if="!loading">Sign Up</span>
        <span v-else class="spinner"></span>
      </button>
      <button @click.prevent='googleSignIn' :disabled="loading" class="google-button">
        <span v-if="!loading">Sign Up with Google</span>
        <span v-else class="spinner"></span>
      </button>
    </form>
  </div>
</template>

<script>
import email from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
import user from '../assets/Icons/user-alt-light.svg';
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase/firebaseInit';

export default {
  name: 'Register',
  components: { email, password, user },
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      error: false,
      errorMsg: "",
      loading: false,
    };
  },
  methods: {
    async register() {
      if (this.firstName && this.lastName && this.userName && this.email && this.password) {
        this.error = false;
        this.errorMsg = '';
        this.loading = true;
        try {
          const firebaseAuth = await firebase.auth();
          const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
          const result = await createUser;
          const database = db.collection('users').doc(result.user.uid);
          await database.set({
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
            password: this.password
          });
          this.$router.push({ name: "Home" });
        } catch (error) {
          this.error = true;
          this.errorMsg = error.message;
        } finally {
          this.loading = false;
        }
      } else {
        this.error = true;
        this.errorMsg = 'Please fill out all the fields';
      }
    },
    async googleSignIn() {
      this.loading = true;
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        const database = db.collection('users').doc(user.uid);
        await database.set({
          firstName: user.displayName.split(' ')[0],
          lastName: user.displayName.split(' ')[1],
          userName: user.displayName,
          email: user.email,
        });
        this.$router.push({ name: "Home" });
      } catch (error) {
        this.error = true;
        this.errorMsg = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
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
