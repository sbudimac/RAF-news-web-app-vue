<template>
  <div>
    <PlatformaNav/>
    <h1>News by categories</h1>
    <div id="formica" class="container">
      <form @submit.prevent="doSearch">
        <input v-model="search" type="text" id="search" placeholder="Search..." name="search" required>
        <button type="submit">Go</button>
      </form>
    </div>
    <div class="custom-select" style="width:200px;" v-if="kategorije">
      <p style="font-size: 20px">Choose a category:</p>
      <select id="categories" class="form-select" @change="getKategorijaVesti($event)" v-model="kategorijaIme" aria-label="Default select example">
        <option v-for="(kategorija) in kategorije" :key="kategorija.kategorijaId">{{ kategorija.ime }}</option>
      </select>
    </div>
    <div v-if="vesti">
      <div class="news" v-for="(vest) in vesti" :key="vest.vestId" v-on:click="openNews(vest.vestId)">
        <h2>{{ vest.naslov }}</h2>
        <p>{{ vest.tekst|shortText }}</p>
        <p>{{ kategorije_[vest.kategorijaId] }}</p>
        <small>{{ vest.vremeKreiranja }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import PlatformaNav from "../components/PlatformaNav";
import Vue from "vue";
export default {
  name: "Kategorije",
  components: {PlatformaNav},
  mounted() {
    this.$axios.get("/api/platforma_kategorije").then((response) => {
      this.kategorije = response.data
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
      kategorije: [],
      vesti: [],
      kategorijaIme: '',
      kategorijaId: 1,
      search: '',
      kategorije_: {}
    }
  },
  methods: {
    async getKategorijaVesti(event) {
      await this.$axios.get(`/api/platforma_kategorije/${event.target.value}`).then((response) => {
        this.kategorijaId = response.data.kategorijaId
      })
      await this.$axios.get(`/api/platforma_vesti/${this.kategorijaId}`).then((response) => {
        this.vesti = response.data
      })
    },
    getCategory(kategorijaId) {
      this.$axios.get(`/api/platforma_kategorije/id/${kategorijaId}`).then((response) => {
        Vue.set(this.kategorije, kategorijaId, response.data.ime)
      })
    },
    doSearch() {
      localStorage.setItem('search', document.getElementById("search").value);
      this.$router.push({name: "PlatformaSearchNews"})
    },
    openNews(vestId) {
      localStorage.setItem('open_id', vestId)
      this.$router.push({name: "Vest"})
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
#formica {
  width: 400px;
  float: right;
}
</style>