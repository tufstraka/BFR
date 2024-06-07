<template>
  <div class="form-wrap">
    <form @submit.prevent="resetPassword" class="reset-password-form">
      <h2>Reset Password</h2>
      <div class="inputs">
        <div class="input">
          <input
            type="password"
            placeholder="New Password"
            v-model="newPassword"
            required
          />
          <password-icon class="icon"/>
        </div>
      </div>
      <button type="submit" class="reset-button">Reset Password</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import passwordIcon from '../assets/Icons/lock-alt-solid.svg';

export default {
  name: 'ResetPassword',
  components: {
    passwordIcon
  },
  data() {
    return {
      newPassword: ''
    };
  },
  methods: {
    resetPassword() {
      const urlParams = new URLSearchParams(window.location.search);
      const oobCode = urlParams.get('oobCode');

      if (oobCode && this.newPassword) {
        firebase.auth().confirmPasswordReset(oobCode, this.newPassword)
          .then(() => {
            alert('Password reset successful!');
            this.$router.push('/login');
          })
          .catch((error) => {
            alert('Error resetting password: ' + error.message);
          });
      } else {
        alert('Invalid or expired action code.');
      }
    }
  }
};
</script>

<style scoped>
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

  .reset-button {
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 14px;
    width: 100%;
    text-align: center;

    &:hover {
      background-color: #2980b9;
    }
  }
}
</style>
