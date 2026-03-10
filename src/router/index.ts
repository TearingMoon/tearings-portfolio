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
      }),
      meta: { title: 'Main Menu' }
    },
    {
      path: '/testing',
      name: 'testing',
      component: () => import('../views/TestingView.vue'),
      meta: { title: 'Testing' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { title: 'Contact' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
      meta: { title: 'Projects' }
    },
    {
      path: '/achievements',
      name: 'achievements',
      component: () => import('../views/AchievementsView.vue'),
      meta: { title: 'Achievements' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'About' }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue'),
      meta: { title: 'News' }
    },
    {
      path: '/experiments',
      name: 'experiments',
      component: () => import('../views/ExperimentsView.vue'),
      meta: { title: 'Experiments' }
    },
    {
      path: '/availability',
      name: 'availability',
      component: () => import('../views/AvailabilityView.vue'),
      meta: { title: 'Availability' }
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('../views/DocumentsView.vue'),
      meta: { title: 'Documents' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: '404 - Not Found' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Update document title
  const baseTitle = 'David T. - Portfolio'
  document.title = to.meta?.title ? `${to.meta.title} | ${baseTitle}` : baseTitle

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
