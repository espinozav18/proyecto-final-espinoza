<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-alert v-if="mensaje !== ''" dense outlined type="error">
      {{ mensaje }}
    </v-alert>
    <v-alert v-if="mensajeRegistro !== ''" dense outlined type="success">
      {{ mensajeRegistro }}
    </v-alert>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="9">
        <v-text-field
          v-model.trim="prodItem.nombre"
          :rules="[(v) => !!v || 'Nombre es requerido',
          (v) => v && v.length <= 50 || 'nombre solo 50 caracteres']"
          label="Nombre del producto"
          :counter="50"
          required
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12" sm="3">
        <v-text-field
          v-model.trim="prodItem.modelo"
          :rules="[(v) => !!v || 'modelo es requerido']"
          label="modelo"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="3">
        <v-text-field
          v-model.trim="prodItem.marca"
          :rules="[(v) => !!v || 'Marca es requerido']"
          label="Marca"
          required
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12" sm="9">
        <v-text-field
          v-model.trim="prodItem.descripcion"
          :rules="[(v) => !!v || 'Descripcion es requerido']"
          label="Descripcion"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="3">
        <v-text-field
          v-model.number="prodItem.precio"
          :rules="[(v) => !!v || 'precio es requerido']"
          :type="'number'"
          label="precio"
          required
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12" sm="3">
        <v-text-field
          v-model.number="prodItem.stock"
          :rules="[(v) => !!v || 'number es requerido']"
          :type="'number'"
          label="Stock"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn :disabled="!valid"  color="success" class="mr-4" @click="validate">
      Guardar
    </v-btn>

  </v-form>
</template>

<script>
const axios = require("axios");
export default {
  props: {
    prodItem: Object,
  },
  data: () => ({
    valid: true,
    prodItems: {
      id: 0,
      nombre: "",
      modelo: "",
      marca: "",
      descripcion: "",
      moneda: "S/",
      precio: 0,
      stock: 0,
      imagenes: ["https://images.pexels.com/photos/5489402/pexels-photo-5489402.jpeg?h=650&w=940"],
    },
    mensaje: "",
    mensajeRegistro: "",
  }),

  methods: {
    async validate() {
      const validar = this.$refs.form.validate();
      if (validar) {
        
        await axios
          .put(
            `https://61b75f4e64e4a10017d18ae0.mockapi.io/productos/${this.$props.prodItem.id}`,
            this.$props.prodItem
          )
          .then((rpta) => {
            if (rpta.status == 201 || rpta.status == 200) {
              this.$emit("datosProductos", true);
              this.mensaje = "";
              this.mensajeRegistro = "Se actualizo satisfactoriamente";
            } else {
              this.mensaje = "Usuario no encontrado";
              this.mensajeRegistro = "";
            }
          })
          .catch((error) => {
            this.mensaje = error.response.status + ": " + error.message;
          });
        
      }
    },
  
  },
};
</script>

<style lang="scss" scoped>
</style>