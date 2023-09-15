import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Genre from './pages/Genre.vue'
import DetailedMovie from './pages/DetailedMovie.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/home', redirect: '/' },
    { path: '/', name : 'Home' , component: Home },
    { path: '/genre/:name/:id', name : 'Genre' , component: Genre },
    { path: '/movie/:id', name : 'DetailedMovie' , component: DetailedMovie },
    // { path: '/:catchAll(.*)', component: NotFound },
  ]
})


createApp(App).use(router).mount('#app')
