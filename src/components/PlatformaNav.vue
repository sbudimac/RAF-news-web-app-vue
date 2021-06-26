<template>
  <div>
    <div>
      <h1>RAF news reading platform</h1>
    </div>
    <div id="nav">
      <h3><router-link to="/platforma">Home page</router-link> | <router-link to="/najcitanije">Most popular</router-link> | <router-link to="/kategorije">Categories</router-link></h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlatformaNav"
}
</script>

<style scoped>
#nav h3 a {
  color: #42b983;
  text-decoration: none;
}

#nav h3 a.router-link-exact-active {
  color: #333;
}

#nav h3 a:hover:not(.active) {
  color: #111;
}
</style>