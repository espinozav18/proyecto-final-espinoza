import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const axios = require("axios");
export default new Vuex.Store({
  state: {
    listaProductos: [],
    carritoProductos: [],
    usuario: {},
    existeProdCar: { success: false, mensaje: "" },
    detallePedido: [],
    loginUsuario: {
      admin: false,
      login: true,
      dialog: false,
      datosLogin: [],
      mensaje: ''
    }

  },
  mutations: {
    LISTAR_PRODUCTOS_VENTA(state, payload) {
      state.listaProductos = payload;
    },
    REGISTRAR_CARRITO(state, payload) {
      state.carritoProductos.push(payload)
      // console.info(state.carritoProductos);
    },
    ESTADO_AGREGAR_PRODUCTO(state, payload) {
      state.existeProdCar = payload;

    },
    ELIMINAR_PRODUCTOS_CARRITO(state) {
      state.listaProductos = [];
    },
    DETALLE_PEDIDO(state, payload) {
      state.detallePedido = [];
      state.detallePedido = payload;
    },
    //inicio Usuario

    ACTUALIZAR_ESTADO_LOGIN(state, payload) {
      state.loginUsuario.login = payload;
    },
    ACTUALIZAR_ESTADO_DIALOG(state, payload) {
      state.loginUsuario.dialog = payload.dialog;
    },
    ACTUALIZAR_ESTADO_ADMIN(state, payload) {
      state.loginUsuario.admin = payload;
    },
    MENSAJE_USUARIO_LOGIN(state, payload) {
      state.loginUsuario.mensaje = payload;
    },
    //fin usuario

  },
  actions: {
    async obtenerListaProductos(context) {
      await axios
        .get(`https://61b75f4e64e4a10017d18ae0.mockapi.io/productos`, {})
        .then((rpta) => {
          if (rpta.status == 201 || rpta.status == 200) {
            context.commit("LISTAR_PRODUCTOS_VENTA", rpta.data)
          }
        })
        .catch((error) => {
          console.info(error.response.status + ": " + error.message);
        });
    },
    agregarProductoCarrito(context, payload) {
      let listaCard = context.state.carritoProductos;
      let exite = 0;//console.info(payload);
      listaCard.forEach(element => {
        if (element.id == payload.id) {
          exite++;
        }
      });
      if (exite == 0) {
        let prodCard = {
          //nro: (listaCard.length + 1),
          id: payload.id,
          imagenes: payload.imagenes,
          nombre: payload.nombre,
          marca: payload.marca,
          modelo: payload.modelo,
          precio: payload.precio,
          cantidad: 1,
          stock: payload.stock,
          total: payload.precio * 1
        };
        context.commit("REGISTRAR_CARRITO", prodCard);
        context.commit("ESTADO_AGREGAR_PRODUCTO", { success: true, mensaje: "Producto Agregado" });

      } else {
        context.commit("ESTADO_AGREGAR_PRODUCTO", { success: true, mensaje: "Producto Existe en lista" });
      }

    },
    eliminarProductoCarrito(context) {
      context.commit("ELIMINAR_PRODUCTOS_CARRITO");
    },
    detallePedido(context, payload) {
      context.commit("DETALLE_PEDIDO", payload);
    },
    //INICIO Usuario
    async buscarUsuarioLogin(context, payload) {
      let validUsuario = [];
      if (this.email === "admin@gmail.com" && this.password === "Admin2021") {
        context.commit("ACTUALIZAR_ESTADO_LOGIN", false);
        context.commit("ACTUALIZAR_ESTADO_DIALOG", false);
        context.commit("ACTUALIZAR_ESTADO_ADMIN", true);
        context.commit("LISTAR_USUARIO_LOGIN", validUsuario);
        context.commit("MENSAJE_USUARIO_LOGIN", "");

      } else {
        await axios
          .get(`https://61b75f4e64e4a10017d18ae0.mockapi.io/usuarios`, {})
          .then((rpta) => {
            if (rpta.status == 201 || rpta.status == 200) {
              validUsuario = rpta.data.find(
                (user) =>
                  user.usuario === payload.email &&
                  user.password === payload.password
              );

              if (validUsuario != "" && validUsuario !== undefined) {
                //this.dialog = false;
                //this.login = false;
                //this.usuario = validUsuario;
                context.commit("LISTAR_USUARIO_LOGIN", validUsuario);
                context.commit("ACTUALIZAR_ESTADO_LOGIN", false);
                context.commit("ACTUALIZAR_ESTADO_DIALOG", false);
                context.commit("ACTUALIZAR_ESTADO_ADMIN", false);
                context.commit("MENSAJE_USUARIO_LOGIN", "");
                this.mensajeRegistro = "";
              } else {
                context.commit("MENSAJE_USUARIO_LOGIN", "Usuario no encontrado");
                //this.mensaje = "Usuario no encontrado";
              }
            }
          })
          .catch((error) => {
            context.commit("MENSAJE_USUARIO_LOGIN", error.response.status + ": " + error.message);
            //this.mensaje = error.response.status + ": " + error.message;
          });
      }


    },
    cambios_estado(context,payload) {
      context.commit("ACTUALIZAR_ESTADO_DIALOG", payload);
    }
    //FIN Usuario


  },
  modules: {
  }
})
