<template>
  <v-row class="pa-6">
    <v-col cols="12" sm="2">
      <v-card class="pa-2" tile>
        <!-- =====================-->
        <MenuAdmin />
        <!--====================---->
      </v-card>
    </v-col>
    <v-col cols="12" sm="4">
      <v-card class="pa-2" tile>
        <v-card-title>Registro Productos </v-card-title>
        <v-card-text>
          <CrearProducto />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card class="pa-2" tile>
        <v-card-title>Productos </v-card-title>

        <v-card-text>
          <TablaProductos />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TablaProductos from "../../components/TablaProductos.vue";
import CrearProducto from "../../components/CrearProducto.vue";
import MenuAdmin from "../../components/MenuAdmin.vue";

export default {
  components: {
    TablaProductos,
    CrearProducto,
    MenuAdmin
  },
  data() {
    return {
     
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.flm:link {
  text-decoration: none;
}
</style>
