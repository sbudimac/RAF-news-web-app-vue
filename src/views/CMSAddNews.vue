<template>
  <div>
    <CMSNav/>
    <div id="form-div">
      <form @submit.prevent="add" id="category-form">
        <div class="form-group">
          <label for="exampleInputTitle">News title</label>
          <input type="text" class="form-control" id="exampleInputTitle" aria-describedby="nameHelp" placeholder="News title" required>
        </div>
        <div class="form-group">
          <label for="exampleInputText">Text</label>
          <input type="text" class="form-control" id="exampleInputText" placeholder="Text" required>
        </div>
        <div class="form-group">
          <label for="categories">Category</label>
          <select id="categories" name="categories" class="form-select">
            <option v-for="(kategorija) in kategorije" :key="kategorija.kategorijaId">{{ kategorija.ime }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleInputTags">Tags</label>
          <input type="text" class="form-control" id="exampleInputTags" placeholder="Tags">
        </div>
        <button type="submit" class="btn btn-primary">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import CMSNav from "../components/CMSNav";
import router from "../router";
export default {
  name: "CMSAddNews",
  components: {CMSNav},
  mounted() {
    this.$axios.get("/api/platforma_kategorije").then((response) => {
      this.kategorije = response.data
    })
  },
  data() {
    return {
      naslov: '',
      tekst: '',
      vremeKreiranja: '',
      kategorijaId: 1,
      autorId: 1,
      brojPoseta: 0,
      kategorijaIme: '',
      kategorije: [],
      korisnikEmail: localStorage.getItem('user'),
    }
  },
  methods: {
    async add() {
      this.naslov = document.getElementById("exampleInputTitle").value
      this.tekst = document.getElementById("exampleInputText").value
      this.vremeKreiranja = new Date();
      /*const dd = String(this.vremeKreiranja.getDate()).padStart(2, '0');
      const mm = String(this.vremeKreiranja.getMonth() + 1).padStart(2, '0');
      const yyyy = this.vremeKreiranja.getFullYear();
      this.vremeKreiranja = mm + '/' + dd + '/' + yyyy;*/
      this.kategorijaIme = document.getElementById("categories").value
      await this.$axios.get(`/api/cms_korisnici/${this.korisnikEmail}`).then((response) => {
        this.autorId = response.data.korisnikId
      })
      await this.$axios.get(`/api/cms_kategorije/${this.kategorijaIme}`).then((response) => {
        this.kategorijaId = response.data.kategorijaId
      })
      await this.$axios.post('/api/cms_vesti/', {
        naslov: this.naslov,
        tekst: this.tekst,
        vremeKreiranja: this.vremeKreiranja,
        brojPoseta: this.brojPoseta,
        autorId: this.autorId,
        kategorijaId: this.kategorijaId
      }).then(
          async function () {
            await router.push({name: 'CMSVesti'});
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