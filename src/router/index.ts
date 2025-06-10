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
      path: '/Contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/Projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/Achivements',
      name: 'achivements',
      component: () => import('../views/AchivementsView.vue')
    },
    {
      path: '/Skills',
      name: 'skills',
      component: () => import('../views/SkillsView.vue')
    },
    {
      path: '/News',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    }
  ]
})

export default router
