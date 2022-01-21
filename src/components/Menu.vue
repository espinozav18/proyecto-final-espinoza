<template>
  <v-card dark>
    <v-toolbar color="bar-fondo">
      <v-app-bar-nav-icon
        @click="drawer = true"
        v-if="$vuetify.breakpoint.xsOnly"
      >
      </v-app-bar-nav-icon>
      <v-app-bar-nav-icon v-else
        >
        <router-link
        to="/"
        color="bar-fondo"
        ><v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/tienda.png"
          transition="scale-transition"
          width="40"
      /></router-link
      ></v-app-bar-nav-icon>

      <v-toolbar-title
        :class="{
          '': $vuetify.breakpoint.smAndDown,
          'ml-6': $vuetify.breakpoint.mdAndUp,
        }"
      >
        {{ titulo }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link
        to="/"
        dark
        class="text-capitalize mr-2 v-btn--active flm" 
        v-show="$vuetify.breakpoint.lgOnly"
        color="bar-fondo"
        >Home</router-link
      >

      <router-link
        dark
        to="/contacto"
        v-show="$vuetify.breakpoint.lgOnly"
        class="text-capitalize mr-2 flm"
        color="bar-fondo"
        >Contacto</router-link
      >
      

      <Login />
      <Carrito  />
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      width="100%"
      height="auto"
      temporary
    >
      <v-list nav dense color="bar-fondo">
        <v-list-item-group v-model="group">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <router-link to="/" class="flm">Home</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-earth</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <router-link to="/contacto" class="flm">Contacto</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-earth</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <router-link to="/productos" class="flm">Admin</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>


<script>
import Login from "./Login.vue";
import Carrito from "./Carrito.vue";
export default {
  name: "Menu",

  components: {
    Login,
    Carrito,
  },
  props: {
    titulo: String,
    
  },

  data() {
    return {
      drawer: false,
      group: null,
    };
  },

  methods: {},
};
</script>


<style lang="scss" scoped>
.bgsel:hover {
  background: #afaeae;
}

.flm:link {
  text-decoration: none;
}

.v-application a {
  color: #ffffff !important;
}
.bar-fondo {
  background-color: #3d5afe !important;
}
</style>