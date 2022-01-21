<template>
  <v-footer padless  color="bar-fondo">
    <v-col
      class="text-center"
      cols="12"
    >
      <strong>{{titulo}}.</strong> ©{{ new Date().getFullYear() }} — <strong> Todos los Derechos Reservados.</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  props:{
      titulo:{type:String}
  },
  data(){
      return {
        
      }
  },
  methods: {
  
  },

  mounted() {
    //this.obtenerAño();
  },
};
</script>


<style lang="scss" scoped>
.bar-fondo{
    background-color: #3D5AFE !important;
}
</style>