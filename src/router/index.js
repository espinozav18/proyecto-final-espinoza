import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/edituser/:id',
    name: 'EditarUsuario',
    component: () => import('../views/EditarUsuario.vue')
  },

  {
    path: '/productos',
    name: 'Productos',
    component: () => import('../views/Admin/Productos.vue')
  },
  {
    path: '/pagar',
    name: 'Pagar',
    component: () => import('../views/Pagar.vue')
  },
  {
    path: '/pedido',
    name: 'Pedidos',
    component: () => import('../views/Admin/Pedidos.vue')
  },
  /*{
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin/Admin.vue')
  },*/

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
