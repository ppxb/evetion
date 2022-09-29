import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('../pages/login.vue') },
    { path: '/dashboard', component: () => import('../pages/dashboard.vue') },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router