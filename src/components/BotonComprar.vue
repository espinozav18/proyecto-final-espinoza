<template>
  <div class="text-center">
    <v-bottom-sheet inset v-model="sheet">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          color="success"
          v-if="producto.stock > 0"
          @click="comprarItem(producto)"
          ><v-icon>mdi-cart-plus </v-icon>Comprar</v-btn
        >
        <v-chip v-else dark>Sin stock</v-chip>
      </template>
      <v-card tile>
        <v-progress-linear
          :value="100"
          class="my-0"
          height="5"
        ></v-progress-linear>

        <router-link to="/pagar" class="text-capitalize mr-2 v-btn--active flm">
          <v-btn color="success" class="mt-6" @click="sheet = !sheet">
            Pagar S/
            <span class="total-pagar"> {{ total | formatDecimal2 }}</span>
          </v-btn></router-link
        >

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Gracias por su compra!</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";
const numeral = require("numeral");

export default {
  name: "BotonComprar",
  //extends: Menu,
  props: {
    producto: Object,
  },
  data() {
    return { sheet: false };
  },

  methods: {
    comprarItem(prod) {
      /*this.$listaCarrito.push({
        nombre: prod.nombre,
        marca: prod.marca,
        modelo: prod.modelo,
        precio: prod.precio,
        cantidad: 1,
        total: prod.precio * 1,
      });*/
      this.$store.dispatch("agregarProductoCarrito", prod);
      // console.info(prod);
    },
  },
  computed: {
    ...mapState({
      respuestaAgregar: (state) => state.existeProdCar,
      total: (state) => state.carritoProductos.reduce((a, b) => a + b.total, 0),
    }),
  },
  filters: {
    formatDecimal2(value) {
      return numeral(value).format("0,000.00");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>