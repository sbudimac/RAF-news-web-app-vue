<template>
  <div>
    <CMSNav/>
    <h1>Manage news</h1>
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
        <td>{{ vest.vremeKreiranja }}</td>
        <td v-on:click="updateVest(vest.vestId, vest.naslov, vest.tekst, vest.vremeKreiranja, vest.brojPoseta, vest.kategorijaId)" style="text-decoration: underline">Edit</td>
        <td v-on:click="deleteVest(vest.vestId)" style="color: red; font-weight: bold; text-decoration: underline">Delete</td>
      </tr>
      </tbody>
    </table>
    <button v-on:click="addVest" type="button" class="btn btn-success" style="margin-top: 20px">ADD NEWS</button>
  </div>
</template>

<script>
import CMSNav from "../components/CMSNav";
import router from "../router";
export default {
  name: "CMSCategoryNews",
  components: {CMSNav},
  mounted() {
    this.$axios.get(`/api/platforma_vesti/${this.kategorijaId}`).then((response) => {
      this.vesti = response.data
    })
  },
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
      kategorijaId: localStorage.getItem('vesti_kategorija'),
      vesti: []
    }
  },
  methods: {
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
      }).then(
          async function () {
            await router.go(0)
          }
      )
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