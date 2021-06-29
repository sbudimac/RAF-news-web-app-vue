<template>
  <div>
    <CMSNav/>
    <h1>Search the news</h1>
    <div id="form-div">
      <form @submit.prevent="searchNews" id="search-form">
        <div class="form-group">
          <input type="text" class="form-control" id="exampleInputSearch" aria-describedby="nameHelp" placeholder="Search..." required>
        </div>
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Content</th>
        <th scope="col">Date of posting</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(vest) in vesti" :key="vest.vestId">
        <th scope="row">{{ vest.naslov }}</th>
        <td>{{ vest.tekst | shortText }}</td>
        <td>{{ new Date(vest.vremeKreiranja).toDateString() }}</td>
        <td v-on:click="updateVest(vest.vestId, vest.naslov, vest.tekst, vest.vremeKreiranja, vest.brojPoseta, vest.kategorijaId)" style="text-decoration: underline">Edit</td>
        <td v-on:click="deleteVest(vest.vestId)" style="color: red; font-weight: bold; text-decoration: underline">Delete</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CMSNav from "../components/CMSNav";
export default {
  name: "CMSSearch",
  components: {CMSNav},
  filters: {
    shortText(value) {
      if (value.length < 20) {
        return value;
      }
      return value.slice(0, 20) + '...'
    }
  },
  data() {
    return {
      vesti: []
    }
  },
  methods: {
    searchNews() {
      this.$axios.get(`/api/cms_vesti/search/${document.getElementById("exampleInputSearch").value}`).then(response => {
        this.vesti = response.data
      })
    },
    addVest() {
      this.$router.push({name: 'CMSAddNews'})
    },
    updateVest(vestId, naslov, tekst, vremeKreiranja, brojPoseta, kategorijaId) {
      localStorage.setItem('vest_id', vestId)
      localStorage.setItem('vest_naslov', naslov)
      localStorage.setItem('vest_tekst', tekst)
      localStorage.setItem('vest_datum', vremeKreiranja)
      localStorage.setItem('vest_posete', brojPoseta)
      localStorage.setItem('vest_kategorija', kategorijaId)
      this.$router.push({name: 'CMSUpdateNews'})
    },
    deleteVest(vestId) {
      this.$axios.delete(`/api/cms_vesti/${vestId}`, {
        vestId: vestId
      }).then(() => this.refreshVesti())
    },
    refreshVesti() {
      this.$axios.get("/api/cms_vesti").then(response => {
        this.vesti = response.data
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
  margin-top: 100px;
  background-color: #04AA6D;
  color: white;
}
#search-form {
  width: 50%;
  margin: auto;
  border-radius: 5px;
  background-color: #04AA6D;
  padding: 20px;
}

input[type=text] {
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
</style>