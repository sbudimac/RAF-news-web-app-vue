<template>
  <div>
    <CMSNav/>
    <h1>Manage categories</h1>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(kategorija) in kategorije" :key="kategorija.kategorijaId">
        <th v-on:click="categoryNews(kategorija.kategorijaId)" scope="row" style="text-decoration: underline">{{ kategorija.ime }}</th>
        <td>{{ kategorija.opis }}</td>
        <td v-on:click="updateCategory(kategorija.kategorijaId, kategorija.ime, kategorija.opis)" style="text-decoration: underline">Edit</td>
        <td v-on:click="deleteCategory(kategorija.kategorijaId)" style="color: red; font-weight: bold; text-decoration: underline">Delete</td>
      </tr>
      </tbody>
    </table>
    <button v-on:click="addCategory" type="button" class="btn btn-success" style="margin-top: 20px">ADD CATEGORY</button>
  </div>
</template>

<script>
import CMSNav from "../components/CMSNav";
export default {
  name: "CMSKategorije",
  components: {CMSNav},
  mounted() {
    this.$axios.get("/api/platforma_kategorije").then((response) => {
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
    addCategory() {
      this.$router.push({name: 'CMSAddCategory'})
    },
    updateCategory(kategorijaId, ime, opis) {
      localStorage.setItem('kategorija_id', kategorijaId)
      localStorage.setItem('kategorija_ime', ime)
      localStorage.setItem('kategorija_opis', opis)
      this.$router.push({name: 'CMSUpdateCategory'})
    },
    deleteCategory(kategorijaId) {
      this.$axios.delete(`/api/cms_kategorije/${kategorijaId}`, {
        kategorijaId: kategorijaId
      }).then(() => this.refreshKategorije()).catch(() => {
        window.alert('This category contains news.')
      })
    },
    categoryNews(kategorijaId) {
      localStorage.setItem('vesti_kategorija', kategorijaId)
      this.$router.push({name: 'CMSCategoryNews'})
    },
    refreshKategorije() {
      this.$axios.get("/api/platforma_kategorije").then((response) => {
        this.kategorije = response.data
      })
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 40px;
  margin-bottom: 40px;
  color: #04AA6D;
  text-decoration: underline;
}

table {
  background-color: #04AA6D;
  color: white;
}
</style>