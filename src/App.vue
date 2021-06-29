<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/platforma">Reading platform</router-link></li>
        <li><router-link v-if="status === 'AKTIVAN'" to="/cms_kategorije">CMS</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li style="float:right"><router-link to="/about">About</router-link></li>
        <li>
          <form v-if="loggedIn" class="d-flex" @submit.prevent="logout">
            <button class="btn nav-btn" type="submit">Logout</button>
          </form>
        </li>
        <li v-if="loggedIn" style="float:right; color: white; margin-top: 15px"><p>Welcome, {{user}}!</p></li>
      </ul>
    </div>
    <router-view @loggedIn = 'welcome' @status = 'getStatus'/>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.user = localStorage.getItem('user_ime')
  },
  data() {
    return {
      user: localStorage.getItem('user_ime'),
      status: localStorage.getItem('user_status')
    }
  },
  computed: {
    loggedIn() {
      return this.$route.name !== 'Login';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push({name: 'Login'})
    },
    welcome(username) {
      this.user = username
    },
    getStatus(stat) {
      this.status = stat
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #42b983;
}

#nav li {
  float: left;
}

#nav li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

#nav li a.router-link-exact-active {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  background-color: #333;
}

#nav li a:hover:not(.active) {
  background-color: #111;
}

.nav-btn {
  color: white;
  margin-top: 6px;
}
</style>
