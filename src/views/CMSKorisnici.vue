<template>
  <div>
    <CMSNav/>
    <h1>Manage users</h1>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">First name</th>
        <th scope="col">Last name</th>
        <th scope="col">Email</th>
        <th scope="col">Type</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(korisnik) in korisnici" :key="korisnik.korisnikId">
        <th scope="row">{{ korisnik.ime }}</th>
        <td>{{ korisnik.prezime }}</td>
        <td>{{ korisnik.email }}</td>
        <td>{{ korisnik.tip }}</td>
        <td v-on:click="updateKorisnik(korisnik.korisnikId, korisnik.ime, korisnik.prezime, korisnik.email, korisnik.tip, korisnik.status, korisnik.lozinka)" style="text-decoration: underline">Edit</td>
        <td v-if="korisnik.tip === 'CONTENT_CREATOR'" v-on:click="activateDeactivate(korisnik.korisnikId, korisnik.status)" style="color: yellow; font-weight: bold; text-decoration: underline">{{ korisnik.status }}</td>
      </tr>
      </tbody>
    </table>
    <button v-on:click="addKorisnik" type="button" class="btn btn-success" style="margin-top: 20px">ADD USER</button>
  </div>
</template>

<script>
import CMSNav from "../components/CMSNav";
export default {
  name: "CMSKorisnici",
  components: {CMSNav},
  mounted() {
    this.$axios.get('/api/cms_korisnici').then(response => {
      this.korisnici = response.data
    })
  },
  data() {
    return {
      korisnici: []
    }
  },
  methods: {
    addKorisnik() {
      this.$router.push({name: 'CMSAddUser'})
    },
    updateKorisnik(korisnikId, ime, prezime, email, tip, status, lozinka) {
      localStorage.setItem('korisnik_id', korisnikId)
      localStorage.setItem('korisnik_ime', ime)
      localStorage.setItem('korisnik_prezime', prezime)
      localStorage.setItem('korisnik_email', email)
      localStorage.setItem('korisnik_tip', tip)
      localStorage.setItem('korisnik_status', status)
      localStorage.setItem('korisnik_lozinka', lozinka)
      this.$router.push({name: 'CMSUpdateUser'})
    },
    activateDeactivate(korisnikId, status) {
      if (status === "AKTIVAN") {
        this.$axios.put(`/api/cms_korisnici/deaktivacija/${korisnikId}`).then(() => {
          this.refreshKorisnici()
        })
      } else {
        this.$axios.put(`/api/cms_korisnici/aktivacija/${korisnikId}`).then(() => {
          this.refreshKorisnici()
        })
      }
    },
    refreshKorisnici() {
      this.$axios.get('/api/cms_korisnici').then(response => {
        this.korisnici = response.data
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