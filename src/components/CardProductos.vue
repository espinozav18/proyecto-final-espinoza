<template>
  <v-card hover class="alinear mx-auto">
    
    <v-img :src="producto.imagenes[0]" />
    <v-card-title>
      <h5>{{ producto.nombre }}</h5>
    </v-card-title>

    <v-card-subtitle>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            >Precio:
            <strong
              >{{ producto.moneda }} {{ producto.precio | decimal2 }}</strong
            ></v-list-item-title
          >
          <v-list-item-subtitle
            >Cantidad: {{ producto.stock }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card-subtitle>

    <v-card-actions>
      <BotonComprar :producto="producto" />
      <v-spacer></v-spacer>
      <DetalleProduco :producto="producto" />
    </v-card-actions>
  </v-card>
</template>

<script>
import DetalleProduco from "./DetalleProducto.vue";
import BotonComprar from "./BotonComprar.vue";
export default {
  components: {
    DetalleProduco,
    BotonComprar,
  },
  props: {
    producto: Object,
  },
  data() {
    return {
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
        loading: true,
        firstLoad: true,
      },
    };
  },
  filters: {
    decimal2(value) {
      return value.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
.alinear {
  text-align: left;
}
</style>
