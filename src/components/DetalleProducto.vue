<template>
  <v-row justify="space-around">
    <v-col cols="auto" >
      <v-dialog transition="dialog-top-transition" width="800">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="info" v-bind="attrs" v-on="on"
            ><v-icon>mdi-eye</v-icon>Detalle</v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card class="alinear">
            <v-toolbar color="primary" dark>{{ producto.nombre }}</v-toolbar>
            <v-card-text>
              <v-row class="pa-4">
                <v-col sm="6">
                  <v-carousel hide-delimiters vertical height="300">
                    <v-carousel-item
                      v-for="(item, i) in producto.imagenes"
                      :key="i"
                      :src="item"
                    ></v-carousel-item> </v-carousel
                ></v-col><!--:src="require('../assets/img/' + item)"-->
                <v-col sm="6">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Marca</v-list-item-title>
                      <v-list-item-subtitle>{{
                        producto.marca
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Modelo</v-list-item-title>
                      <v-list-item-subtitle>{{
                        producto.modelo
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title>Descripcion</v-list-item-title>
                      <v-list-item-subtitle>
                        <p>{{ producto.descripcion }}</p>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                       <BotonComprar  :producto="producto" />
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="error" text @click="dialog.value = false"
                >Cerrar</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import BotonComprar from "./BotonComprar.vue";
export default {
  props: {
    producto: Object,
  },
  components: {BotonComprar},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.alinear{
 text-align: left;
}
</style>