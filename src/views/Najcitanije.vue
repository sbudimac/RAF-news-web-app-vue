<template>
  <div>
    <PlatformaNav/>
    <h1>Most popular</h1>
    <div id="formica" class="container">
      <form @submit.prevent="doSearch">
        <input v-model="search" type="text" id="search" placeholder="Search..." name="search" required>
        <button type="submit">Go</button>
      </form>
    </div>
    <div id="vesti" v-if="vesti">
      <div class="news" v-for="(vest) in vesti" :key="vest.vestId">
        <h2>{{ vest.naslov }}</h2>
        <p>{{ vest.tekst|shortText }}</p>
        <p>{{ kategorije[vest.kategorijaId] }}</p>
        <small>{{ vest.vremeKreiranja }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import PlatformaNav from "../components/PlatformaNav";
import Vue from "vue";
export default {
  name: "Najcitanije",
  components: {PlatformaNav},
  mounted() {
    this.$axios.get("/api/platforma_vesti/najcitanije").then((response) => {
      for (let vest of response.data) {
        let kategorijaId = vest.kategorijaId
        if (this.kategorije[kategorijaId] === undefined) {
          this.getCategory(kategorijaId)
        }
      }
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
      vesti: [],
      search: '',
      kategorije: {}
    }
  },
  methods: {
    getCategory(kategorijaId) {
      this.$axios.get(`/api/platforma_kategorije/id/${kategorijaId}`).then((response) => {
        Vue.set(this.kategorije, kategorijaId, response.data.ime)
      })
    },
    doSearch() {
      localStorage.setItem('search', document.getElementById("search").value);
      this.$router.push({name: "PlatformaSearchNews"})
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
#formica {
  width: 400px;
  float: right;
}
</style>