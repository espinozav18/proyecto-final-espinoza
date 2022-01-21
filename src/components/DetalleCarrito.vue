<template>
  <div>
    <v-data-table
      :headers="carritoHeaders"
      :items="carritoItem"
      hide-default-footer
      class="elevation-1,pa-4"
    >
      <template v-slot:item.imagen="{ item }">
        <v-img :src="item.imagenes[0]" width="100" />
      </template>
      <template v-slot:item.cantidad="{ item }">
        {{ item.cantidad }}
      </template>
      <template v-slot:item.precio="{ item }">
        {{ item.precio | formatDecimal2 }}
      </template>
      <template v-slot:item.total="{ item }">
        {{ item.total | formatDecimal2 }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
const numeral = require("numeral");
import {mapState} from "vuex"
//const axios = require("axios");
export default {
  props: {
    prodItem: Object,
  },
  data() {
    return {
      carritoHeaders: [
        // { text: "#", value: "nro",sortable: false },
        { text: "", value: "imagen", sortable: false },
        { text: "Nombre ", value: "nombre", sortable: false },
        { text: "Marca ", value: "marca", sortable: false },
        { text: "Precio", value: "precio", align: "right", sortable: false },
        { text: "Cantidad", value: "cantidad", sortable: false },
        { text: "Total", value: "total", align: "right", sortable: false },
      ],
      //carritoItem: [],
    };
  },
  mounted() {
    //this.carritoItem = this.$props.prodItem.listapedido;
  },
  computed: {
      ...mapState({carritoItem: (state)=>state.detallePedido.listapedido})
    /*carritoItem() {
      const datos = [];
      axios
        .get(
          `https://61b75f4e64e4a10017d18ae0.mockapi.io/carrito/${this.$props.prodItem.id}`,
          {}
        )
        .then((rpta) => {
          if (rpta.status == 201 || rpta.status == 200) {
           const datos = rpta.data;
          }
        })
        .catch((error) => {
          console.info(error.response.status + ": " + error.message);
        });
         return datos.listapedido;  
    },*/
  },
  methods: {},
  filters: {
    formatDecimal2(value) {
      return numeral(value).format("0,000.00");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>