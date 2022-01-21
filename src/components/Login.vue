<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
        @click="
          (mensaje = ''), (registroUsuario = false), (mensajeRegistro = '')
        "
        v-show="login"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <router-link
        dark
        to="/productos"
        v-show="$vuetify.breakpoint.lgOnly && admin"
        class="text-capitalize mr-2 flm a-router"
        color="bar-fondo"
        >Admin</router-link
      >
      <!--<router-link to="/login"> <v-icon>mdi-account</v-icon></router-link> -->

      <v-list color="bar-fondo" v-show="login">
        <v-list-item class="bgsel">
          <v-list-item-title
            v-bind="attrs"
            v-on="on"
            @click="(mensaje = ''), (registroUsuario = true)"
            >Registrar</v-list-item-title
          >
        </v-list-item>
      </v-list>

      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="login == false"
            dark
            class="text-capitalize mr-2"
            color="blue"
            v-bind="attrs"
            v-on="on"
          >
            <v-list-item-title to="/" class="flm">
              <v-icon>mdi-account-cog</v-icon>
              {{ usuario.usuario }}
            </v-list-item-title>
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="bgsel" link>
            <router-link
              :to="`/edituser/` + usuario.id"
              class="flm"
              color="bar-fondo"
              >Editar datos</router-link
            >
          </v-list-item>
          <v-list-item class="bgsel" @click="(login = true), (admin = false)">
            <router-link :to="'/'" color="bar-fondo"
              >Cerrar Sessión</router-link
            >
            <!--<v-list-item-title  :to="'/'" class="text-lg-left" @click="(login = true);"
              >Cerrar Sessión</v-list-item-title
            >-->
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <v-card v-if="!registroUsuario">
      <v-toolbar color="primary" dark>Iniciar Sessión</v-toolbar>

      <v-card-text class="pt-2">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            maxlength="16"
            :rules="passwordRules"
            :type="'password'"
            label="Password"
            required
          ></v-text-field>
          <v-alert v-if="mensaje !== ''" dense outlined type="error">
            {{ mensaje }}
          </v-alert>
          <v-alert v-if="mensajeRegistro !== ''" dense outlined type="success">
            {{ mensajeRegistro }}
          </v-alert>
        </v-form>
      </v-card-text>
      <v-card-actions offset-y>
        <v-spacer></v-spacer>
        <v-btn color="error" class="mr-4" @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Ingresar
        </v-btn>
      </v-card-actions>
    </v-card>
    <registroUsuario @cerrarDialog="cerrarDialogs($event)" v-else />
  </v-dialog>
</template>

<script>
//import usuarios from "../assets/json/usuario.json";
import registroUsuario from "./RegistroUsuario.vue";
import { mapState } from "vuex";
//const axios = require("axios");
export default {
  components: {
    registroUsuario,
  },
  /* props:{
      mensajes:{type:Boolean}
    },*/
  data: () => ({
    //usuario: {},
    //usuario: usuarios,
    items: [{ title: "Cerrar Sesión" }],
    //login: true,
    //admin: false,
    //mensaje: "",
    mensajeRegistro: "",
    editar: false,
    //dialog: false, //mostra dialog
    valid: true,
    registroUsuario: false, //mostrar formulario login
    password: "Coders2021",
    passwordRules: [
      (v) => !!v || "Contraseña",
      (v) =>
        /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}/.test(v) ||
        "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.",
      //(v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/.test(v) || "Name must be less than 10 characters",
    ],
    email: "coderhouse@gmail.com",
    emailRules: [
      (v) => !!v || "E-mail",
      (v) => /.+@.+\..+/.test(v) || "E-mail no es valido",
    ],
  }),
  computed: {
    ...mapState({
      admin: (state) => state.loginUsuario.admin,
      dialog: (state) => state.loginUsuario.dialog,
      login: (state) => state.loginUsuario.login,
      usuario: (state) => state.loginUsuario.datosLogin,
      mensaje: (state) => state.loginUsuario.mensaje,
    }),
  },
  methods: {
    cerrarDialogs(param) {
      this.registroUsuario = param.registroUsuario;
      this.dialog = param.dialog;
      this.email = param.usuario;
      this.password = "";
      this.mensajeRegistro = "Usuario Se creo satisfactorimente";
    },

    async validate() {
      const validar = this.$refs.form.validate();

      if (validar) {
        /*const validUsuario = this.usuario.find(
                  (user) =>
                    user.usuario === this.email && user.password === this.password
                );*/
        //let validUsuario = [];
        /*if (this.email === "admin@gmail.com" && this.password === "Admin2021") {
          this.admin = true;
          this.dialog = false;
          this.login = false;
          this.usuario = validUsuario;
          this.mensajeRegistro = "";
        } else {*/
          await this.$store.dispatch("buscarUsuarioLogin", {
            email: this.email,
            password: this.password,
          });
          /*axios
                               .get(`https://61b75f4e64e4a10017d18ae0.mockapi.io/usuarios`, {})
                               .then((rpta) => {
                                 if (rpta.status == 201 || rpta.status == 200) {
                                   validUsuario = rpta.data.find(
                                     (user) =>
                                       user.usuario === this.email &&
                                       user.password === this.password
                                   );

                                   if (validUsuario != "" && validUsuario !== undefined) {
                                     this.dialog = false;
                                     this.login = false;
                                     this.usuario = validUsuario;
                                     this.mensajeRegistro = "";
                                   } else {
                                     this.mensaje = "Usuario no encontrado";
                                   }
                                 }
                               })
                               .catch((error) => {
                                 this.mensaje = error.response.status + ": " + error.message;
                               });*/
       // }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style lang="scss" scoped>
.a-router {
  color: white;

  text-decoration: none;
}

.bar-fondo {
  background-color: #3d5afe !important;
}
</style>
