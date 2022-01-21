<template>
  <div class="home">
    <Carrusel />
    <!--<v-row class="pa-6">
      <v-col>-->
        <CardsContainer :productos="listProductos" />
     <!-- </v-col>
    </v-row>-->
  </div>
</template>

<script>

import Carrusel from "../components/Carrusel.vue";
import CardsContainer from "../components/CardsContainer.vue";
import { mapState } from "vuex"; 

export default {
  name: "Home",
  components: {
    Carrusel,
    CardsContainer,
  },
  data: () => ({
 
  }),
   mounted() {
    this.$store.dispatch("obtenerListaProductos");
  },
  computed: {
    ...mapState({ listProductos: (state) => state.listaProductos }),
  },
  methods: {

  },
};
</script>
