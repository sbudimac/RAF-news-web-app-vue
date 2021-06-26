<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/platforma">Reading platform</router-link></li>
        <li><router-link to="/cms">CMS</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li style="float:right"><router-link to="/about">About</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

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

</style>
