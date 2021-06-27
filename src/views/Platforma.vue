<template>
  <div>
    <PlatformaNav/>
    <div id="vesti" v-if="vesti">
      <div class="news" v-for="(vest) in vesti" :key="vest.vestId">
        <h2>{{ vest.naslov }}</h2>
        <p>{{ vest.tekst.substr(0, vest.tekst.length/4) + '...' }}</p>
        <small>{{ new Date(vest.vremeKreiranja).toLocaleDateString("en-US") }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import PlatformaNav from "../components/PlatformaNav";
export default {
  name: "Platforma",
  components: {PlatformaNav},
  mounted() {
    this.$axios.get("/api/platforma_vesti/homepage").then((response) => {
      console.log(response)
      this.vesti = response.data;
    })
  },
  data() {
    return {
      vesti: []
    }
  }
}
</script>

<style scoped>
  .news {
    margin: 40px;
    border-bottom: 2px solid #04AA6D;
  }
</style>