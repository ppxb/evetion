import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: () => import('../pages/login.vue') },
  { path: '/dashboard', component: () => import('../pages/dashboard.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.path !== '/login' && !token) next({ path: '/login' })
  else next()
})

export default router
