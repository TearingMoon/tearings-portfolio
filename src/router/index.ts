import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'
import TestingView from '../views/TestingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/menu'
    },
    {
      path: '/menu/:startAnimation?',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/testing',
      name: 'testing',
      component: TestingView
    }
  ]
})

export default router
