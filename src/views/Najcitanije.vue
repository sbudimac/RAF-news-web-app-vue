<template>
  <div>
    <PlatformaNav/>
    <h1>Most popular</h1>
    <div id="vesti" v-if="vesti">
      <div class="news" v-for="(vest) in vesti" :key="vest.vestId">
        <h2>{{ vest.naslov }}</h2>
        <p>{{ vest.tekst|shortText }}</p>
        <small>{{ vest.vremeKreiranja }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import PlatformaNav from "../components/PlatformaNav";
export default {
  name: "Najcitanije",
  components: {PlatformaNav},
  mounted() {
    this.$axios.get("/api/platforma_vesti/najcitanije").then((response) => {
      this.vesti = response.data
    })
  },
  filters: {
    shortText(value) {
      if (value.length < 40) {
        return value;
      }
      return value.slice(0, 40) + '...'
    }
  },
  data() {
    return {
      vesti: []
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 40px;
  color: #04AA6D;
  text-decoration: underline;
}
.news {
  margin: 40px;
  border-bottom: 2px solid #04AA6D;
}
</style>