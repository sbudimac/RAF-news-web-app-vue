<template>
  <div>
    <PlatformaNav/>
    <h1>#{{ this.rec }}</h1>
    <div id="vesti" v-if="vesti">
      <div class="news" v-for="(vest) in vesti" :key="vest.vestId" v-on:click="openNews(vest.vestId)">
        <h2>{{ vest.naslov }}</h2>
        <p>{{ vest.tekst | shortText }}</p>
        <p>{{ kategorije[vest.kategorijaId] }}</p>
        <small>{{ new Date(vest.vremeKreiranja).toDateString() }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import PlatformaNav from "../components/PlatformaNav";
import Vue from "vue";
export default {
  name: "TaggedNews",
  components: {PlatformaNav},
  mounted() {
    this.$axios.get(`/api/platforma_vesti/tag/${this.tagId}`).then(response => {
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
      tagId: localStorage.getItem('tag'),
      rec: localStorage.getItem('rec'),
      vesti: [],
      kategorije: {}
    }
  },
  methods: {
    getCategory(kategorijaId) {
      this.$axios.get(`/api/platforma_kategorije/id/${kategorijaId}`).then((response) => {
        Vue.set(this.kategorije, kategorijaId, response.data.ime)
      })
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
.news {
  margin: 40px;
  border-bottom: 2px solid #04AA6D;
}
</style>