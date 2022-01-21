<template>
  <v-row class="pa-6">
     <v-col cols="12" sm="2">
      <v-card class="pa-2" tile>
        <!-- =====================-->
        <MenuAdmin />
        <!--====================---->
      </v-card>
    </v-col>
    <v-col cols="12" sm="10">
      <v-card class="pa-2" tile>
        <v-card-title>Lista Pedidos </v-card-title>
        <v-card-text>
          <v-alert v-if="mensaje !== ''" dense outlined type="error">
            {{ mensaje }}
          </v-alert>
          <v-alert v-if="mensajeRegistro !== ''" dense outlined type="success">
            {{ mensajeRegistro }}
          </v-alert>
          <v-card-title>
            <v-btn @click="listacarrito" color="blue" text
              ><v-icon>mdi-update</v-icon>Actualizar</v-btn
            >
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="pedidoItems"
            :items-per-page="5"
            class="elevation-1"
            :loading="'!=pedidoItems.length'"
            loading-text="Cargando...Por favor espere!"
          >
            <template v-slot:item.estado="{ item }">
              <v-chip :color="getColor(item.estado)" dark>
                {{ item.estado | estadosDescripcion }}
              </v-chip>
            </template>
            <template v-slot:item.nombre="{ item }">
              {{ item.datoscliente.nombre }} {{ item.datoscliente.apellidos }}
            </template>
            <template v-slot:item.telefono="{ item }">
              {{ item.datoscliente.telefono }}
            </template>
            <template v-slot:item.total="{ item }">
              {{ item.total | decimalNumer }}
            </template>

            <template v-slot:item.acciones="{ item }">
              <v-icon
                medium
                color="warning"
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-view-headline
              </v-icon>
              <v-icon
                medium
                color="success"
                @click="deleteItem(item)"
                v-if="item.estado == 0"
              >
                mdi-check
              </v-icon>
            </template>
          </v-data-table>
          <template>
            <v-dialog v-model="dialog" max-width="700px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Pedido</span>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>

                <v-card-text>
                  <DetalleCarrito
              :prodItem="pItem"
              
            />
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h6"
                  >Esta seguro Cambiar estado de Pendiente ->
                  <span> ATENDIDO</span>?</v-card-title
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
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DetalleCarrito from "../../components/DetalleCarrito.vue"
import MenuAdmin from "../../components/MenuAdmin.vue";
const axios = require("axios");
const numeral = require("numeral");
export default {
  props: {
    /*pedidoItems: Array,
    mensaje:String*/
  },
  components: {
      DetalleCarrito,
      MenuAdmin
    //EditarProducto,
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
        { text: "Correo", value: "email", filterable: false },
        { text: "Telefono", value: "telefono", filterable: false },
        { text: "Total", value: "total", filterable: false, align: "right" },

        { text: "Estado", value: "estado", filterable: true, align: "right" },
        {
          text: "Acciones",
          value: "acciones",
          align: "right",
          filterable: false,
        },
      ],
      pedidoItems: [],
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
    this.listacarrito();
  },
  methods: {
    getColor(bono) {
      if (bono) return "green";
      else return "red";
    },
    cargarDatos() {
      this.listacarrito();
    },
    async listacarrito() {
      this.mensaje = "";
      this.mensajeRegistro = "";
      this.pedidoItems = [];
      await axios
        .get(`https://61b75f4e64e4a10017d18ae0.mockapi.io/carrito`, {})
        .then((rpta) => {
          if (rpta.status == 201 || rpta.status == 200) {
            this.pedidoItems = rpta.data;
          }
        })
        .catch((error) => {
          this.mensaje = error.response.status + ": " + error.message;
        });
    },
    editItem(item) {
      this.pItem = item;
       this.$store.dispatch("detallePedido",this.pItem);
      this.dialog = true;
    },

    deleteItem(item) {
      this.idDelete = item.id;
      /*this.editedIndex = this.pedidoItems.indexOf(item);
      this.editedItem = Object.assign({}, item);*/
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await axios
        .get(
          `https://61b75f4e64e4a10017d18ae0.mockapi.io/carrito/${this.idDelete}`,
          {}
        )
        .then((rpta) => {
          if (rpta.status == 201 || rpta.status == 200) {
            let datos = rpta.data;
            datos.estado = 1;
            axios
              .put(
                `https://61b75f4e64e4a10017d18ae0.mockapi.io/carrito/${this.idDelete}`,
                datos
              )
              .then((rpta) => {
                if (rpta.status == 201 || rpta.status == 200) {
                  this.idDelete = 0;
                  this.listacarrito();
                  this.mensaje = "";
                  this.mensajeRegistro = "Se Actualizo estado";
                }
              })
              .catch((error) => {
                this.mensajeRegistro = "";
                this.mensaje = error.response.status + ": " + error.message;
              });
          }
        })
        .catch((error) => {
          console.info(error.response.status + ": " + error.message);
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
      return numeral(value).format("0,000.00");
    },
    estadosDescripcion(value) {
      return parseInt(value) === 0 ? "Pendiente" : "Atendido";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
