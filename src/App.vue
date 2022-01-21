<template>
  <v-app>
    <Menu :titulo="nombreTienda"  />
      <router-view >
        
      </router-view>
      
    <Footer :titulo="nombreTienda" />
    
  </v-app>
</template>

<script>
import Menu from "./components/Menu.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "Home",
  components: {
    Menu,
    Footer,
  },
  data: () => ({
    nombreTienda: "Tienda Store",
   
  }),
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
