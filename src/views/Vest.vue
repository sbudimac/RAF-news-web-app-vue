<template>
  <div>
    <h1>{{ this.vest.naslov }}</h1>
    <p>{{ this.vest.tekst }}</p>
    <small>{{ new Date(this.vest.vremeKreiranja).toDateString() }}</small>
    <p>{{ this.korisnik }}</p>
    <p v-for="(tag) in tagovi" :key="tag.tagId" v-on:click="taggedNews(tag.tagId, tag.rec)" style="display: inline">#{{ tag.rec }} </p>
    <h4>---------------------------------------------------------------------------------------</h4>
    <h2 style="margin-top: 40px">Comments</h2>
    <div id="form-div">
      <form @submit.prevent="addComment" id="comment-form">
        <div class="form-group">
          <label for="exampleInputAuthor">Author name</label>
          <input type="text" class="form-control" id="exampleInputAuthor" aria-describedby="nameHelp" placeholder="Author name" required>
        </div>
        <div class="form-group">
          <label for="exampleInputComment">Comment</label>
          <input type="text" class="form-control" id="exampleInputComment" placeholder="Comment" required>
        </div>
        <button type="submit" class="btn btn-primary">Add comment</button>
      </form>
    </div>
    <div id="komentari" v-if="komentari">
      <div class="comments" v-for="(komentar) in komentari" :key="komentar.komentarId">
        <h4>{{ komentar.imeAutora }}</h4>
        <p>{{ komentar.komentar }}</p>
        <small>{{ new Date(komentar.datumKreiranja).toDateString() }}</small>
      </div>
    </div>
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
    this.$axios.get(`/api/cms_korisnici/${this.korisnikEmail}`).then(response => {
      this.autorId = response.data.korisnikId
    })
    this.$axios.get(`/api/platforma_vesti/tagovi/${this.vestId}`).then(response => {
      this.tagovi = response.data
    })
  },
  data() {
    return {
      vestId: localStorage.getItem('open_id'),
      vest: {},
      komentari: [],
      korisnik: '',
      tagovi: []
    }
  },
  methods: {
    addComment() {
      this.$axios.post(`/api/platforma_vesti/${this.vestId}`, {
        imeAutora: document.getElementById("exampleInputAuthor").value,
        komentar: document.getElementById("exampleInputComment").value,
        vestId: this.vestId
      }).then(() => this.refreshKomentare()).then(
        document.getElementById("exampleInputAuthor").value = '',
        document.getElementById("exampleInputComment").value = ''
      )
    },
    refreshKomentare() {
      this.$axios.get(`/api/platforma_vesti/${this.vestId}/komentari`).then(response => {
        this.komentari = response.data
      })
    },
    taggedNews(tagId, rec) {
      localStorage.setItem('tag', tagId)
      localStorage.setItem('rec', rec)
      this.$router.push({name: 'TaggedNews'})
    }
  }
}
</script>

<style scoped>
#comment-form {
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

.comments {
  margin: 40px;
  border-bottom: 2px solid #04AA6D;
}
</style>