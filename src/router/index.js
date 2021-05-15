import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import ApplicationForm from '@/views/ApplicationForm'
import Applicants from '@/views/Applicants'
import Admin from '@/views/Admin'
import Settlement from '@/views/Settlement'

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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin/',
    component: Admin,
    children: [
      {
        path: '', 
        name: 'applicants',
        components: {
          default: Applicants,
        }
      },
      {
        path: 'settlement/', 
        name: 'settlement',
        component: Settlement
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router