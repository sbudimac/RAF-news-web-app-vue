<template>
  <div>
    <div class="bck-green">
      <h1 class="white">{{ welcome }}</h1>
      <h2 class="white"><router-link to="/platforma">Reading platform</router-link></h2>
      <h2 class="white"><router-link to="/cms">CMS managment</router-link></h2>
    </div>
    <div>
      <p>Klikom na vest, sa bilo kog od navedenih izvora, potrebno je prikazati čitavu vest, tj. naslov, tekst, datum kreiranja, ime autora, tagove koji su dodeljeni toj vesti i sve komentare koji pripadaju toj vesti, sortirane po datumu kreiranje, opadajuće. Uz svaki komentar prikazati i ime autora komentara i datum kreiranja. Iznad liste sa postojećim komentarima, potrebno je implementirati formu i funckionalnost za dodavanje novog komentara. Forma za dodavanje komentara sadrži ime čitalaca i tekst samog komentara, polja koja su obavezna.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  props: {
    welcome: String
  }
}
</script>

<style scoped>

.bck-green {
  background-color: #42b983;
}

.white {
  color: white;
}

a {
  color: white;
  text-decoration: none;
}
</style>