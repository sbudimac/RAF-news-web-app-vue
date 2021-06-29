<template>
  <div>
    <CMSNav/>
    <div id="form-div">
      <form @submit.prevent="add" id="user-form">
        <div class="form-group">
          <label for="exampleInputName">User first name</label>
          <input type="text" class="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="First name" required>
        </div>
        <div class="form-group">
          <label for="exampleInputLastName">User Last name</label>
          <input type="text" class="form-control" id="exampleInputLastName" placeholder="Last name" required>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail">User email</label>
          <input type="text" class="form-control" id="exampleInputEmail" placeholder="Email" required>
        </div>
        <div class="form-group">
          <label for="types">User type</label>
          <select id="types" name="types" class="form-select">
            <option selected>CONTENT_CREATOR</option>
            <option>ADMIN</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword">Pawssword</label>
          <input type="password" class="form-control" id="exampleInputPassword" placeholder="Password">
        </div>
        <div class="form-group">
          <label for="exampleInputConfirmPassword">Confirm pawssword</label>
          <input type="password" class="form-control" id="exampleInputConfirmPassword" placeholder="Confirm password">
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
  name: "CMSAddUser",
  components: {CMSNav},
  data() {
    return {
      ime: '',
      prezime: '',
      email: '',
      tip: '',
      lozinka: '',
      potvrda: ''
    }
  },
  methods: {
    add() {
      this.ime = document.getElementById("exampleInputName").value
      this.prezime = document.getElementById("exampleInputLastName").value
      this.email = document.getElementById("exampleInputEmail").value
      this.tip = document.getElementById("types").value
      this.lozinka = document.getElementById("exampleInputPassword").value
      this.potvrda = document.getElementById("exampleInputConfirmPassword").value
      if (this.lozinka !== this.potvrda) {
        window.alert("Password and confirmed password must be the same.")
      } else {
        console.log(this.email + ' ' + this.ime + ' ' + this.prezime + ' ' + this.tip + ' ' + this.lozinka)
        this.$axios.post('/api/cms_korisnici', {
          email: this.email,
          ime: this.ime,
          prezime: this.prezime,
          tip: this.tip,
          lozinka: this.lozinka
        }).then(
            async function () {
              await router.push({name: 'CMSKorisnici'});
            }
        )
      }
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