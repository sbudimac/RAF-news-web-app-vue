<template>
  <div>
    <PlatformaNav/>
    <div id="vesti" v-if="vesti">
      <ul>
        <li v-for="vest in vesti" :key="vest.vestId">
          Naslov: {{ vest.naslov }} <br>
          Tekst: {{ vest.tekst }} <br>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PlatformaNav from "../components/PlatformaNav";
export default {
  name: "Platforma",
  components: {PlatformaNav},
  mounted() {
    this.$axios.get("/api/platforma_vesti").then((response) => {
      console.log(response)
      this.vesti = response.data;
    })
  },
  data() {
    return {
      vesti: []
    }
  }
}
</script>

<style scoped>

</style>