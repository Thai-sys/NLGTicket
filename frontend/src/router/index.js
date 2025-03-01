import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: () => import('../pages/Home/Home.vue') },
    { path: '/random', component: () => import('../components/movie/random_poster.vue') },
    { path: '/header', component: () => import('../components/header/header.vue') },
    { path: '/banner', component: () => import('../components/movie/banner.vue') },
    { path: '/login', component: () => import('../pages/auth/login.vue') },
    { path: '/register', component: () => import('../pages/auth/register.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
