<template>
  <div>
    <CMSNav/>
    <div id="form-div">
      <form @submit.prevent="update(korisnikId)" id="user-form">
        <div class="form-group">
          <label for="exampleInputName">New first name</label>
          <input v-model="ime" type="text" class="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="First name" required>
        </div>
        <div class="form-group">
          <label for="exampleInputLastName">New last name</label>
          <input v-model="prezime" type="text" class="form-control" id="exampleInputLastName" placeholder="Last name" required>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail">New last name</label>
          <input v-model="email" type="text" class="form-control" id="exampleInputEmail" placeholder="Email" required>
        </div>
        <div class="form-group">
          <label for="types">New type</label>
          <select v-model="tip" id="types" name="types" class="form-select">
            <option selected>CONTENT_CREATOR</option>
            <option>ADMIN</option>
          </select>
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
  name: "CMSUpdateUser",
  components: {CMSNav},
  data() {
    return {
      korisnikId: localStorage.getItem('korisnik_id'),
      ime: localStorage.getItem('korisnik_ime'),
      prezime: localStorage.getItem('korisnik_prezime'),
      email: localStorage.getItem('korisnik_email'),
      tip: localStorage.getItem('korisnik_tip'),
      status: localStorage.getItem('korisnik_status'),
      lozinka: localStorage.getItem('korisnik_lozinka')
    }
  },
  methods: {
    update(korisnikId) {
      this.ime = document.getElementById("exampleInputName").value
      this.prezime = document.getElementById("exampleInputLastName").value
      this.email = document.getElementById("exampleInputEmail").value
      this.tip = document.getElementById("types").value
      this.$axios.put(`/api/cms_korisnici/${korisnikId}`, {
        email: this.email,
        ime: this.ime,
        prezime: this.prezime,
        tip: this.tip,
        status: this.status,
        lozinka: this.lozinka
      }).then(
          async function () {
            await router.push({name: 'CMSKorisnici'})
          }
      )
    }
  }
}
</script>

<style scoped>
#user-form {
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
</style>