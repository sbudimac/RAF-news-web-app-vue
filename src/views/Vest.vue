<template>
  <div>
    <h1>{{ this.vest.naslov }}</h1>
    <p>{{ this.vest.tekst }}</p>
    <small>{{ new Date(this.vest.vremeKreiranja).toDateString() }}</small>
    <p>{{ this.korisnik }}</p>
  </div>
</template>

<script>

export default {
  name: "Vest",
  mounted() {
    this.$axios.get(`/api/platforma_vesti/vesti/${this.vestId}`).then(response => {
      this.vest = response.data
      this.$axios.get(`/api/platforma_korisnici/${response.data.autorId}`).then(response => {
        this.korisnik = response.data.ime + ' ' + response.data.prezime
      })
    })
    this.$axios.get(`/api/platforma_vesti/${this.vestId}/komentari`).then(response => {
      this.komentari = response.data
    })
    this.$axios.get(`/api/cms_korisnici/${this.korisnikEmail}`).then((response) => {
      this.autorId = response.data.korisnikId
    })
  },
  data() {
    return {
      vestId: localStorage.getItem('open_id'),
      vest: {},
      komentari: [],
      korisnik: '',
    }
  },
  /*methods: {
    getUser(autorId) {
      this.$axios.get(`/api/platforma_korisnici/${autorId}`).then(response => {
        Vue.set(this.korisnik, 1, response.data.ime)
      })
    }
  }*/
}
</script>

<style scoped>

</style>