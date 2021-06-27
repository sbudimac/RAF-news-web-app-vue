<template>
  <div>
    <PlatformaNav/>
    <h1>News by categories</h1>
    <div class="custom-select" style="width:200px;" v-if="kategorije">
      <select id="categories" class="form-select" aria-label="Default select example">
        <option v-for="(kategorija) in kategorije" :key="kategorija.kategorijaId" v-on:change="getKategorijaVesti(kategorija.kategorijaId)" value="category">{{ kategorija.ime }}</option>
      </select>
    </div>
    <div v-if="vesti">
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
  name: "Kategorije",
  components: {PlatformaNav},
  mounted() {
    this.$axios.get("/api/platforma_kategorije").then((response) => {
      console.log(response)
      this.kategorije = response.data
    })
  },
  data() {
    return {
      kategorije: [],
      vesti: []
    }
  },
  methods: {
    getKategorijaVesti(kategorijaId) {
      this.$axios.get(`/api/platforma_vesti/${kategorijaId}`).then((response) => {
        this.vesti = response.data
      })
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
  .custom-select {
    margin-left: 40px;
  }

  #categories {
    background-color: #04AA6D;
    color: white;
  }

  .news {
    margin: 40px;
    border-bottom: 2px solid #04AA6D;
  }
</style>