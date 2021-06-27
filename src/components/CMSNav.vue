<template>
  <div>
    <div>
      <h1>RAF news CMS</h1>
    </div>
    <div id="nav">
      <h3><router-link to="/cms_kategorije">Categories</router-link> | <router-link to="/cms_vesti">News</router-link> | <router-link to="/cms_pretraga">Search</router-link></h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "CMSNav"
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