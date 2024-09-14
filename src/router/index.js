import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/homePage.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path:'/',
    redirect:"/home"
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
