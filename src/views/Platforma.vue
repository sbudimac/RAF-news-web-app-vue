<template>
  <div>
    <PlatformaNav/>
    <h1>Homepage</h1>
    <div id="vesti" v-if="vesti">
      <div class="news" v-for="(vest) in vesti" :key="vest.vestId">
        <h2>{{ vest.naslov }}</h2>
        <p>{{ vest.tekst | shortText }}</p>
        <p>{{ getCategory(vest.kategorijaId) }}</p>
        <small>{{ vest.vremeKreiranja }}</small>
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
      this.vesti = response.data;
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
      vesti: [],
    }
  },
  methods: {
    async getCategory(kategorijaId) {
      let kategorija;
      await this.$axios.get(`/api/cms_kategorije/id/${kategorijaId}`).then((response) => {
        kategorija = response.data.ime
      })
      console.log("" + kategorija)
      return kategorija
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