<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "Carrusel",
  data() {
    return {
      items: [
        {
          src: require("../assets/img/carrusel/teclado01.jpg"),
        },
        {
          src: require("../assets/img/carrusel/teclado01.jpg"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>