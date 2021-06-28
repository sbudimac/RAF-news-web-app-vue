<template>
  <div>
    <CMSNav/>
    <div id="form-div">
      <form @submit.prevent="update(vestId)" id="category-form">
        <div class="form-group">
          <label for="exampleInputTitle">News title</label>
          <input v-model="naslov" type="text" class="form-control" id="exampleInputTitle" aria-describedby="nameHelp" placeholder="News title" required>
        </div>
        <div class="form-group">
          <label for="exampleInputText">Text</label>
          <input v-model="tekst" type="text" class="form-control" id="exampleInputText" placeholder="Text" required>
        </div>
        <div class="form-group">
          <label for="categories">Category</label>
          <select v-model="kategorijaIme" id="categories" name="categories" class="form-select">
            <option v-for="(kategorija) in kategorije" :key="kategorija.kategorijaId">{{ kategorija.ime }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleInputTags">Tags</label>
          <input type="text" class="form-control" id="exampleInputTags" placeholder="Tags">
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import CMSNav from "../components/CMSNav";
import router from "../router";
export default {
  name: "CMSUpdateNews",
  components: {CMSNav},
  mounted() {
    this.$axios.get("/api/platforma_kategorije").then((response) => {
      this.kategorije = response.data
    })
    this.$axios.get(`/api/cms_kategorije/id/${this.kategorijaId}`).then((response) => {
      this.kategorijaIme = response.data.ime
    })
  },
  data() {
    return {
      vestId: localStorage.getItem('vest_id'),
      naslov: localStorage.getItem('vest_naslov'),
      tekst: localStorage.getItem('vest_tekst'),
      vremeKreiranja: localStorage.getItem('vest_datum'),
      brojPoseta: localStorage.getItem('vest_posete'),
      kategorijaId: localStorage.getItem('vest_kategorija'),
      kategorije: [],
      kategorijaIme: ''
    }
  },
  methods: {
    update(vestId) {
      this.ime = document.getElementById("exampleInputTitle").value;
      this.opis = document.getElementById("exampleInputText").value;
      this.$axios.put(`/api/cms_vesti/${vestId}`, {
        naslov: this.naslov,
        tekst: this.tekst,
        vremeKreiranja: this.vremeKreiranja,
        brojPoseta: this.brojPoseta,
        kategorijaId: this.kategorijaId
      }).then(
          async function () {
            await router.push({name: 'CMSVesti'})
          }
      )
    }
  }
}
</script>

<style scoped>
#category-form {
  width: 50%;
  margin: auto;
}

input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button {
  background-color: #04AA6D;
  border: 2px solid white;
}

input[type=submit]:hover {
  background-color: #45a049;
}

label {
  color: white;
}

#form-div {
  border-radius: 5px;
  background-color: #04AA6D;
  padding: 20px;
  margin-top: 60px
}
</style>