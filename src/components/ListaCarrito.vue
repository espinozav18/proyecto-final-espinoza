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
        <v-text-field
          :type="'number'"
          v-model="item.cantidad" :min="1" :max="item.stock"
          v-on:input="item.total = item.cantidad * item.precio"
          :rules="[
            (v) => !!v || 'Ingrese cantidad',
             (v) => (v && (parseInt(v)>0 ))|| 'Cantidad minima 1',
            (v) => (v && (parseInt(v)<=parseInt(item.stock) ))|| 'Solo puede comprar '+item.stock ,
          ]"
          label="cantidad"
          class="align-text"
          required
        ></v-text-field>
      </template>
      <template v-slot:item.precio="{ item }">
        {{ item.precio | formatDecimal2 }}
      </template>
      <template v-slot:item.total="{ item }">
        {{ item.total | formatDecimal2 }}
      </template>
      <template v-slot:item.acciones="{ item }">
        <v-icon color="error" medium @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template></v-data-table
    >
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Esta seguro de Eliminar este Item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" @click="closeDelete">no</v-btn>
          <v-btn color="success darken-1" @click="deleteItemConfirm">si</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
//import mapState from "vuex"
const numeral = require("numeral");
export default {
  props: {
    listaProductos: Array,
  },
  mounted() {
    this.carritoItem = this.$props.listaProductos;
  },
  data() {
    return {
      dialogDelete: false,
      idDelete: 0,
      carritoHeaders: [
        // { text: "#", value: "nro",sortable: false },
        { text: "", value: "imagen", sortable: false },
        { text: "Nombre ", value: "nombre", sortable: false },
        { text: "Marca ", value: "marca", sortable: false },
        { text: "Precio", value: "precio", align: "right", sortable: false },
        { text: "Cantidad", value: "cantidad", sortable: false },
        { text: "Total", value: "total", align: "right", sortable: false },
        { text: "", value: "acciones", sortable: false },
      ],
      carritoItem: [],
    };
  },
  computed: {
    //...mapState({carritoItem: (state)=>state.carritoProductos})
  },
  methods: {
    deleteItem(item) {
      this.idDelete = this.carritoItem.indexOf(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.carritoItem.splice(this.idDelete, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
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