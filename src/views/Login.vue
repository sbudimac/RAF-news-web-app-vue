<template>

  <div>
    <form @submit.prevent="login" style="border:1px solid #ccc">
      <div class="container">
        <h1>Sign In</h1>
        <p>Please fill in this form to sign in.</p>
        <hr>

        <label for="email"><b>Email</b></label>
        <input v-model="email" type="text" id="email" placeholder="Enter Email" name="email" required>

        <label for="password"><b>Password</b></label>
        <input v-model="lozinka" type="password" id="password" placeholder="Enter Password" name="psw" required>

        <div class="clearfix">
          <button type="button" class="cancelbtn">Cancel</button>
          <button type="submit" class="signupbtn">Sign Up</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      lozinka: '',
      korisnik: {}
    }
  },
  methods: {
    login() {
      this.$axios.post('/api/platforma_korisnici/login', {
        email: this.email,
        lozinka: this.lozinka
      }).then(response => {
        localStorage.setItem('jwt', response.data.jwt)
        this.user = VueJwtDecode.decode(response.data.jwt)
        localStorage.setItem('user', this.user.sub)
        localStorage.setItem('user_ime', this.user.ime)
        localStorage.setItem('user_tip', this.user.tip)
        localStorage.setItem('user_status', this.user.status)
        this.$emit('loggedIn', this.user.ime)
        this.$emit('status', this.user.status)
        this.$router.push({name: 'CMSKategorije'})
      })
    }
  }
}
</script>

<style scoped>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity:1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn, .signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn, .signupbtn {
    width: 100%;
  }
}
</style>