<template>
  <div>
    <CMSNav/>
    <div id="form-div">
      <form @submit.prevent="add" id="category-form">
        <div class="form-group">
          <label for="exampleInputName">Category name</label>
          <input type="text" class="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Category name" required>
        </div>
        <div class="form-group">
          <label for="exampleInputDescription">Description</label>
          <input type="text" class="form-control" id="exampleInputDescription" placeholder="Description" required>
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
  name: "CMSAddCategory",
  components: {CMSNav},
  data() {
    return {
      ime: '',
      opis: ''
    }
  },
  methods: {
    add() {
      this.ime = document.getElementById("exampleInputName").value;
      this.opis = document.getElementById("exampleInputDescription").value;
      this.$axios.post('/api/cms_kategorije', {
        ime: this.ime,
        opis: this.opis
      }).then(
       async function () {
         await router.push({name: 'CMSKategorije'});
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

#form-div {
  border-radius: 5px;
  background-color: #04AA6D;
  padding: 20px;
  margin-top: 60px
}
</style>