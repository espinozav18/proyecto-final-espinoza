<template>
  <v-card>
    <v-card-title>
      <h2>Buscar Productos</h2>
      <v-row>
        
        <v-col cols="12">
          <v-text-field
            class="col-12"
            v-model="buscar"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        
        <v-col v-for="(prod, i) in productos" :key="i" cols="12" lg="3" md="6" 
        v-show="(prod.nombre.toLowerCase()).indexOf(buscar.toLowerCase())!== -1">
        
     
          <CardProductos :producto="prod"  />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import CardProductos from "./CardProductos.vue";
export default {
  components: {
    CardProductos,
  },
  props: {
    productos: Array,
  },
  data() {
    return {
      buscar: "",

    };
  },
  computed:{
  
  }
};
</script>

<style lang="scss" scoped>
.alinear {
  text-align: left;
}
</style>