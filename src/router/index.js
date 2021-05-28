import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import ApplicationForm from '@/views/ApplicationForm'
import Applicants from '@/views/Applicants'
import Admin from '@/views/Admin'
//import Settlement from '@/views/Settlement'
import AdminBasket from '@/views/admin/AdminBasket'
import AdminSettlement from '@/views/admin/AdminSettlement'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ApplicationForm
  },
  {
    path: '/form/',
    name: 'form',
    component: ApplicationForm
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin/',
    component: Admin,
    children: [
      {
        path: '',
        name: 'applicants',
        components: {
          default: Applicants
        }
      },
      {
        path: 'settlement/',
        name: 'settlement',
        component: AdminSettlement
      },
      {
        path: 'basket/',
        name: 'basket',
        component: AdminBasket
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
