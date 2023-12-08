import { createRouter, createWebHistory } from 'vue-router';

// HelloWorld is a Homepage with a logo [ 'tried changing filename to Home.vue but it broke my entire application :(' ]
import HelloWorld from '../components/HelloWorld.vue'; 

import About from '../components/About.vue';

import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'

const routes = [
    { path: '/', component: Login }, 
    { path: '/about', component: About },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/profile/:id', component: Profile },
    { path: '/home', component: HelloWorld }
]

const router = createRouter({
    routes, 
    history: createWebHistory()
});

export default router;