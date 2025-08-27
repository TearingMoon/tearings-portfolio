import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/menu'
    },
    {
      path: '/menu/:fast(0|1)?',
      name: 'menu',
      component: () => import('../views/MenuView.vue'),
      props: (route) => ({
        fast: route.params.fast === '1'
      })
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
      path: '/achievements',
      name: 'achievements',
      component: () => import('../views/AchievementsView.vue')
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
    },
    {
      path: '/experiments',
      name: 'experiments',
      component: () => import('../views/ExperimentsView.vue')
    },
    {
      path: '/availability',
      name: 'availability',
      component: () => import('../views/AvailabilityView.vue')
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('../views/DocumentsView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const goingToHome = to.name === 'menu'
  const noFast = !to.params.fast || to.params.fast === '0'
  const comingFromOutside = from.name && from.name !== 'menu'

  if (goingToHome && noFast && comingFromOutside) {
    next({ name: 'menu', params: { fast: '1' }, replace: true })
  } else {
    next()
  }
})

export default router
