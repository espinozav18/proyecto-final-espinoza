<template>
  <v-navigation-drawer permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Administracion </v-list-item-title>
        <v-list-item-subtitle> </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
       <!-- <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>-->
        <v-list-item-title>
          <router-link :to="item.ruta" class="flm">{{
            item.title
          }}</router-link>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Productos", icon: "mdi-store", ruta: "/productos" },
        { title: "Pedidos", icon: "mdi-cart", ruta: "/pedido" },
      ],
      right: null,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>