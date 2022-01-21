<template>
  <div>
    <v-alert v-if="mensaje !== ''" dense outlined type="error">
      {{ mensaje }}
    </v-alert>
    <v-alert v-if="mensajeRegistro !== ''" dense outlined type="success">
      {{ mensajeRegistro }}
    </v-alert>
    <v-card-title>
     
      <v-text-field
        v-model="buscar"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-btn @click="listaProductos" color="blue" text
        ><v-icon>mdi-update</v-icon>Actualizar</v-btn
      >
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="productItems"
      :items-per-page="5"
      :search="buscar"
      class="elevation-1"
      :loading="'!=productItems.length'"
      loading-text="Cargando...Por favor espere!"
    >
      <template v-slot:item.stock="{ item }">
        <v-chip :color="getColor(item.stock)" dark>
          {{ item.stock | decimalNumer }}
        </v-chip>
      </template>
      <template v-slot:item.precio="{ item }">
        {{ item.precio | decimalNumer }}
      </template>

      <template v-slot:item.acciones="{ item }">
        <v-icon medium color="warning" class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon medium color="error" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <template>
      <v-dialog v-model="dialog" max-width="700px">
        <v-card>
          <v-card-title>
            <span class="text-h5">editar</span>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <EditarProducto
              :prodItem="pItem"
              @datosProductos="cargarDatos($event)"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Esta seguro de Eliminar este Item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" @click="closeDelete">no</v-btn>
            <v-btn color="success darken-1" @click="deleteItemConfirm"
              >si</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import EditarProducto from "./EditarProducto.vue";
const axios = require("axios");

export default {
  props: {
    /*productItems: Array,
    mensaje:String*/
  },
  components: {
    EditarProducto,
  },

  data() {
    return {
      buscar: "",
      loadTable: true,
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Modelo", value: "modelo", filterable: false },
        { text: "Marca", value: "marca", filterable: false },
        { text: "Precio", value: "precio", filterable: false, align: "right" },
        { text: "Stock", value: "stock", filterable: false, align: "right" },
        {
          text: "Acciones",
          value: "acciones",
          align: "right",
          filterable: false,
        },
      ],
      productItems: [],
      mensaje: "",
      mensajeRegistro: "",
      pItem: {},
      idDelete: 0,
      dialog: false,
      dialogDelete: false,
    };
  },
  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  mounted() {
    this.listaProductos();
  },
  methods: {
    getColor(bono) {
      if (bono) return "green";
      else return "red";
    },
    cargarDatos() {
      this.listaProductos();
    },
    async listaProductos() {
      this.mensaje = "";
      this.mensajeRegistro = "";
      this.productItems = [];
      await axios
        .get(`https://61b75f4e64e4a10017d18ae0.mockapi.io/productos`, {})
        .then((rpta) => {
          if (rpta.status == 201 || rpta.status == 200) {
            this.productItems = rpta.data;
          }
        })
        .catch((error) => {
          this.mensaje = error.response.status + ": " + error.message;
        });
    },
    editItem(item) {
      this.pItem = item;
      this.dialog = true;
    },

    deleteItem(item) {
      this.idDelete = item.id;
      /*this.editedIndex = this.productItems.indexOf(item);
      this.editedItem = Object.assign({}, item);*/
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
        .delete(
          `https://61b75f4e64e4a10017d18ae0.mockapi.io/productos/${this.idDelete}`,
          {}
        )
        .then((rpta) => {
          if (rpta.status == 201 || rpta.status == 200) {
            this.idDelete = 0;
            this.listaProductos();
            this.mensaje = "";
            this.mensajeRegistro = "Se Elimino satisfactoriamente";
          }
        })
        .catch((error) => {
          this.mensajeRegistro = "";
          this.mensaje = error.response.status + ": " + error.message;
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },
  },
  filters: {
    decimalNumer(value) {
      return value.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
