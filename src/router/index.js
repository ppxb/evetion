import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../pages/login.vue') },
  { path: '/serviceList', component: () => import('../pages/serviceList.vue') },
  { path: '/dashboard', component: () => import('../pages/dashboard.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
