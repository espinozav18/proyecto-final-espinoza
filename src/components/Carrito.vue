<template>
  <v-dialog v-model="dialog" persistent max-width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-badge color="green" v-if="cantItem > 0" :content="cantItem">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <v-icon v-else>mdi-cart</v-icon>
      </v-btn>
      
    </template>

    <v-card>
      <v-toolbar color="primary" dark>Lista de productos</v-toolbar>
      <v-card-text class="pa-5">
        <v-row>
          <v-col cols="12" lg="12">
            <ListaCarrito :listaProductos="carrito"/>
          </v-col>
          <v-col cols="12" lg="12">
            <v-card>
          <v-card-text class="px-0"><h3>Total compra: <span class="total-pagar">{{totalPagar |formatDecimal2 }}</span> </h3></v-card-text>
        </v-card>

            
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="error" text @click="dialog = false">Cerrar</v-btn>
        <v-btn color="success" class="mr-1" @click="dialog = false">
          <router-link :to="'/pagar'" color="white" class="flm a-router"
            >Continuar
          </router-link>
        </v-btn>
      </v-card-actions>
    </v-card>
    
  </v-dialog>
</template>

<script>
import ListaCarrito from "./ListaCarrito.vue"
import { mapState } from "vuex";
const numeral = require("numeral");
export default {
  components:{
    ListaCarrito
  },
  props: {
    /*listaProductos: Array,
    cantItem: Number,*/
  },
  data() {
    return {
      dialog: false, //mostra dialog
      
     /* carrito: [
        {
          nro: 1,
          id: 15,
          nombre: "Teclado",
          marca: "Logitech",
          precio: 150,
          cantidad: 3,
          total: 150 * 3,
        },
        {
          nro: 2,
          id: 16,
          nombre: "Impresora",
          marca: "Epson",
          precio: 200,
          cantidad: 4,
          total: 200 * 4,
        },
      ],*/
    };
  },
   
   computed:{
    ...mapState({carrito: (state)=>state.carritoProductos,
              cantItem: (state)=>state.carritoProductos.length}),
      totalPagar(){
        return this.carrito.reduce((a, b) => a + b.total, 0)
      }
  
  },
  filters:{
    formatDecimal2(value){
      return numeral(value).format("0,000.00")
    }
  }
  

};
</script>

<style lang="scss" scoped>
.a-router {
  color: white;
  font-weight: bold;
  text-decoration: none;
}
.total-pagar{
  color: #D50000;
  font-weight: bold;
}
.align-text{
  text-align: end !important;
}
</style>
