<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img
          :src="'https://images.pexels.com/photos/8128186/pexels-photo-8128186.jpeg?h=450&w=450'"
        ></v-img>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title class="text-h5"> Editar Usuario </v-card-title>
          <v-card-text>
            <v-alert v-if="mensaje !== ''" dense outlined type="error">
                  {{ mensaje }}
                </v-alert>
                <v-alert
                  v-if="mensajeRegistro !== ''"
                  dense
                  outlined
                  type="success"
                >
                  {{ mensajeRegistro }}
                </v-alert>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="usuario.nombre"
                    :rules="[(v) => !!v || 'Ingrese Nombres']"
                    label="Nombre"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="usuario.apellidos"
                    :rules="[(v) => !!v || 'Ingrese Apellidos']"
                    label="Apellidos"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="usuario.fechanacimiento"
                    :type="'date'"
                    :rules="[(v) => !!v || 'Fecha de nacimiento']"
                    label="Fecha de nacimiento"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="usuario.dni"
                    :type="'number'"
                    :rules="[
                      (d) => !!d || 'Ingrese dni',
                      (d) => /\d{8}/.test(d) || 'Dni debe tener 8 digitos',
                    ]"
                    label="Dni"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="usuario.direccion"
                :rules="[(v) => !!v || 'Ingrese dirección']"
                label="Dirección"
                required
              ></v-text-field>
              <v-text-field
                v-model="usuario.usuario"
                disabled
                :rules="[
                  (v) => !!v || 'Ingrese e-mail',
                  (v) => /.+@.+\..+/.test(v) || 'direccion de correo invalida',
                ]"
                label="Email"
                required
              ></v-text-field>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="usuario.password"
                    maxlength="16"
                    :type="'password'"
                    :rules="[
                      (v) => !!v || 'Ingrese contraseña',
                      (v) =>
                        /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}/.test(v) ||
                        'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.',
                    ]"
                    label="contraseña"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="usuario.password2"
                    maxlength="16"
                    :type="'password'"
                    :rules="[
                      (v) => !!v || 'Ingrese contraseña',
                      (v) => v === usuario.password || 'Contrase es diferente',
                    ]"
                    label="repetir contraseña"
                    required
                  ></v-text-field>
                </v-col>
                
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="actualizar"> Actualizar </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      usuario: {
        id: 0,
        nombre: "",
        apellidos: "",
        fechanacimiento: "",
        dni: "",
        direccion: "",
        usuario: "",
        password: "",
        password2: "",
      },
      valid: true,
      mensaje: "",
      mensajeRegistro:''
    };
  },
  mounted() {
    this.buscarUsuario(this.$route.params.id);
  },
  methods: {
    async buscarUsuario(usuarioId) {
      await axios
        .get(
          `https://61b75f4e64e4a10017d18ae0.mockapi.io/usuarios/${usuarioId}`
        )
        .then((rpta) => {
          if (rpta.status == 201 || rpta.status == 200) {
            this.usuario = rpta.data;
            this.usuario.password2 = this.usuario.password;
          }
        })
        .catch((error) => {
          this.mensaje = error.response.status + ": " + error.message;
        });
    },
    async actualizar() {
      const validar = this.$refs.form.validate();
      if (validar) {
        await axios
          .put(
            `https://61b75f4e64e4a10017d18ae0.mockapi.io/usuarios/${this.usuario.id}`,
            this.usuario
          )
          .then((rpta) => {
            console.info(rpta);
            if (rpta.status == 201 || rpta.status == 200) {
             this.mensaje="";
                this.mensajeRegistro="Se actualizo satisfactoriamente";
             
            } else {
              this.mensaje = "Usuario no encontrado";
              this.mensajeRegistro="";
            }
          })
          .catch((error) => {
            this.mensaje = error.response.status + ": " + error.message;
          });
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
