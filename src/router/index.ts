import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('../views/MenuView.vue')
    },
    {
      path: '/testing',
      name: 'testing',
      component: () => import('../views/TestingView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/achivements',
      name: 'achivements',
      component: () => import('../views/AchivementsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    }
  ]
})

export default router
